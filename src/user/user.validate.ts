import { t } from "elysia";
import { isJWTAuthenticated } from "../../middleware/jwt";
import { RequestType } from "../../utils/req.type";

const userTag = "User";

const responseUser = {
  response: {
    200: t.Object(
      {
        _id: t.Any(),
        name: t.String(),
        email: t.String(),
      },
      { additionalProperties: true }
    ),
    400: t.Object({ message: t.String() }, { additionalProperties: true }),
  },
};

const responseMessage = {
  response: t.Object({
    message: t.String(),
  }),
};

export const CreateUserValidate = {
  body: t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    confirm_password: t.String(),
  }),
  detail: { tags: [userTag] },
  ...responseUser,
};

export const GetUserListValidate = {
  beforeHandle(req: RequestType) {
    return isJWTAuthenticated(req);
  },
  detail: { tags: [userTag] },
};

export const GetUserValidate = {
  beforeHandle(req: RequestType) {
    return isJWTAuthenticated(req);
  },
  params: t.Object({
    id: t.String(),
  }),
  detail: { tags: [userTag] },
};

export const UpdateUserValidate = {
  beforeHandle(req: RequestType) {
    return isJWTAuthenticated(req);
  },
  detail: { tags: [userTag] },
  params: t.Object({
    id: t.String(),
  }),
  body: t.Object({
    name: t.String(),
  }),
};

export const DeleteUserValidate = {
  beforeHandle(req: RequestType) {
    return isJWTAuthenticated(req);
  },
  detail: { tags: [userTag] },
  params: t.Object({
    id: t.String(),
  }),
};
