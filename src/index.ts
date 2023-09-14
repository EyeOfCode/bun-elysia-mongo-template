import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import * as mongoose from "mongoose";
import { bearer } from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";

import { UserRouter } from "./user/user.route";
import { AuthRouter } from "./auth/auth.route";
import { currentAuth } from "../middleware/auth";

const port = Bun.env.PORT || 8000;
const app = new Elysia();

await mongoose.connect(
  Bun.env.MONGO_URI || "mongodb://localhost:27017/elysia-template-db"
);

app.use(
  swagger({
    documentation: {
      info: {
        title: "Elysia Template Documentation",
        version: "1.0.0",
      },
      // components: {
      //   securitySchemes: {
      //     bearerAuth: {
      //       type: "http",
      //       scheme: "bearer",
      //       bearerFormat: "JWT",
      //     },
      //   },
      // },
    },
  })
);
app.use(bearer());
app.use(
  jwt({
    name: "jwt",
    secret: Bun.env.JWT_SECRET || "secret",
    exp: Bun.env.JWT_EXP || "7d",
  })
);
app.use(currentAuth);
app.use(cookie());

AuthRouter(app);
UserRouter(app);

app.listen(port);

console.log(
  `🦊 Elysia is running state ${Bun.env.ENV} at ${app.server?.hostname}:${app.server?.port}`
);
