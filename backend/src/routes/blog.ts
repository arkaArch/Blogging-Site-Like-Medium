import { Hono } from 'hono';

const app = new Hono();

app.post("/", (c) => {
    return c.text("");
});

app.get("/", (c) => {
    return c.text("Marattok");
});

/* "/bulk" should declare before "/:id", else "/bulk" redirected to "/:id" */
app.get("/bulk", (c) => {
    return c.text("Chudir Bhai");
});

app.get("/:id", (c) => {
    return c.text("");
});


export default app;