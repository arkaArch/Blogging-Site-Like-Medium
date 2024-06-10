import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie';

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string
    }
}>();

app.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();

    try {
        const new_user = await prisma.user.create({ data: { email, password } });
        /* It is enough to handle duplicate user signup, since we set
        username constrain as @unique */

        const token = await sign({ id: new_user.id }, c.env.JWT_SECRET);

        setCookie(c, "jwt", token, {
            secure: true,
            maxAge: 15 * 24 * 3600,   // 15 days -> seconds
            httpOnly: true,  // prevent XSS (cross site scripting) attack
            sameSite: 'Strict'  // prevent CSRF(Cross site request forgery) attack
        });
        return c.json({ msg: "User created successfully" }, 200)
    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json({ msg: "Error while creating user" }, 401);
    }
});

app.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return c.json({ msg: "Invalid credentials" }, 403);
        }

        if (password !== user.password) {
            return c.json({ msg: "Invalid credentials" }, 403);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        setCookie(c, "jwt", token, {
            secure: true,
            maxAge: 15 * 24 * 3600,   // 15 days -> seconds
            httpOnly: true,  // prevent XSS (cross site scripting) attack
            sameSite: 'Strict'  // prevent CSRF(Cross site request forgery) attack
        });
        return c.json({ msg: "Signed in successfully" }, 200)
    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json({ msg: "Error while signin" }, 401);
    }
});

export default app;