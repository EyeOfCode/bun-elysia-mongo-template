import { Elysia, t } from "elysia";
import UserController from "./user.controller";

export const UserRouter = (app: Elysia) => {
  const userController = new UserController();

  app.group("/user", (app) =>
    app
      .get("/", () => userController.getList())
      .post("/", ({ body }) => userController.create(body.name), {
        body: t.Object({
          name: t.String(),
        }),
      })
      .get(
        "/:id",
        ({ params: { id } }: { params: { id: string } }) =>
          userController.getById(id),
        {
          params: t.Object({
            id: t.String(),
          }),
          response: t.Object({
            id: t.String(),
          }),
        }
      )
  );
};
