import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Blog_Post_Schema, Blog_Update_Schema } from '@arka1313/blog-common';

const app = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string
    },
    Variables: {
        user_id: string,
    }
}>();

interface VerifyToken extends JWTPayload {
    id: string
}

/* Middleware for this route */
app.use("/*", async (c, next) => {
    const jwt = getCookie(c, "jwt");
    if (!jwt) {
        return c.json({ error: "unauthorized" }, 401);
    }

    try {
        const verify_token = await verify(jwt, c.env.JWT_SECRET) as VerifyToken;
        c.set('user_id', verify_token.id);
        await next();
    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json("Unauthorized token");
    }
});


/* Create a blog post */
app.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { success } = Blog_Post_Schema.safeParse(await c.req.json());
    if (!success) {
        return c.json({ msg: "Invalid input" }, 401);
    }

    const { title, content } = await c.req.json();

    try {
        const new_blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: c.get('user_id')
            }
        });

        return c.json({
            msg: "Blog posted successfully",
            blogId: new_blog.id
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json({ msg: "Error while posting blog" }, 500)

    }
});

/* Update a blog post */
app.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { success } = Blog_Update_Schema.safeParse(await c.req.json());
    if (!success) {
        return c.json({ msg: "Invalid input" }, 401);
    }

    const { id, title, content } = await c.req.json();

    try {
        const updated_blog = await prisma.blog.update({
            where: { id },
            data: { title, content }
        });

        return c.json({
            msg: "Blog updated successfully",
            blogId: updated_blog.id
        }, 200);
    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json({ msg: "Error while updating blog" }, 500)
    }
});


/* Get all the blogs */
/* "/bulk" should declare before "/:id", else "/bulk" redirected to "/:id" */
app.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                author: {
                    select: {
                        email: true,
                        profile_picture: true
                    }
                },
                id: true,
                title: true,
                content: true,
                published_at: true
            }
        });
        return c.json({ blogs }, 200);
    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json({ msg: "Error while fething blog" }, 500);
    }
});

/* Get specified blog with id as param */
app.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { id } = c.req.param();

    try {
        const blog = await prisma.blog.findFirst({
            where: { id },
            select: {
                author: {
                    select: {
                        email: true,
                        profile_picture: true
                    }
                },
                id: true,
                title: true,
                content: true,
                published_at: true
            }
        });

        if (!blog) {
            return c.json({ msg: "Blog is not found with this specified id" }, 411);
        }

        return c.json({ blog }, 200);

    } catch (e) {
        console.log(`Error: ${e}`);
        return c.json({ msg: "Error while fething blog" }, 500);
    }
});


export default app;