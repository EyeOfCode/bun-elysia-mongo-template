import { Elysia, t } from "elysia";
import AuthController from "./auth.controller";
import { CurrentAuthValidate, LoginValidate } from "./user.validate";
import { RequestType } from "../../utils/req.type";

export const AuthRouter = (app: Elysia) => {
  const authController = new AuthController();

  app.group("/auth", (app) =>
    app
      .post("/login", (req) => authController.login(req), LoginValidate)
      .get(
        "/",
        (req: RequestType) => {
          const { auth } = req;
          return auth;
        },
        CurrentAuthValidate
      )
  );
};
