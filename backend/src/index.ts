import { Hono } from 'hono';
import { cors } from 'hono/cors';
import userRoute from './routes/user';
import blogRoute from './routes/blog';

const app = new Hono();

app.use('/*', cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
