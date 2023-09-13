import { Elysia } from "elysia";
import { UserRouter } from "./user/user.route";
import swagger from "@elysiajs/swagger";
import * as mongoose from "mongoose";

const port = Bun.env.PORT || 8000;
const app = new Elysia();

await mongoose.connect("mongodb://0.0.0.0:27017/mongoose-bun");

app.use(swagger());

UserRouter(app);

app.listen(port);

console.log(
  `🦊 Elysia is running state ${Bun.env.ENV} at ${app.server?.hostname}:${app.server?.port}`
);
