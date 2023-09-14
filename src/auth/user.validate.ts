import { t } from "elysia";
import { isJWTAuthenticated } from "../../middleware/jwt";
import { RequestType } from "../../utils/req.type";

const authTag = "auth";

const responseToken = {
  response: t.Object({
    token: t.String(),
  }),
};

export const LoginValidate = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  detail: { tags: [authTag] },
  ...responseToken,
};

export const CurrentAuthValidate = {
  beforeHandle(req: RequestType) {
    return isJWTAuthenticated(req);
  },
  detail: { tags: [authTag] },
};
