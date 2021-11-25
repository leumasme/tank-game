import Koa from "koa"
import serve from "koa-static";
import * as d from "path"
const app = new Koa();

app.use(serve(d.resolve(__dirname + "/../../client/build")));

export default app;