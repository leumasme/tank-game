import Koa from "koa"
import serve from "koa-static";
import { resolve } from "path"
const app = new Koa();

app.use(serve(resolve(__dirname + "/../../client/build")));

export default app;