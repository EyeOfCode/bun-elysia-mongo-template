import { Elysia } from "elysia";
import { UserService } from "../src/user/user.serivce";
import { RequestType } from "../utils/req.type";

export const currentAuth = (app: Elysia) =>
  app.derive(async ({ jwt, set, bearer }: RequestType) => {
    const responseUnauthorized = {
      success: false,
      message: "Unauthorized",
      data: null,
    };
    if (!bearer) {
      set.status = 401;
      return responseUnauthorized;
    }
    const replaceToken = bearer.replace("Bearer ", "");
    const { userId } = await jwt.verify(replaceToken);
    if (!userId) {
      set.status = 401;
      return responseUnauthorized;
    }

    const userService = new UserService();
    try {
      const auth = await userService.getById(userId);
      if (!auth) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
          data: null,
        };
      }
      return {
        auth,
      };
    } catch (_) {
      set.status = 401;
      return responseUnauthorized;
    }
  });

export const currentCookieAuth = (app: Elysia) =>
  app.derive(async ({ cookie, jwt, set }: RequestType) => {
    const responseUnauthorized = {
      success: false,
      message: "Unauthorized",
      data: null,
    };
    if (!cookie!.access_token) {
      set.status = 401;
      return responseUnauthorized;
    }
    const { userId } = await jwt.verify(cookie!.access_token);
    if (!userId) {
      set.status = 401;
      return responseUnauthorized;
    }

    const userService = new UserService();
    try {
      const auth = await userService.getById(userId);
      if (!auth) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
          data: null,
        };
      }
      return {
        auth,
      };
    } catch (_) {
      set.status = 401;
      return responseUnauthorized;
    }
  });
