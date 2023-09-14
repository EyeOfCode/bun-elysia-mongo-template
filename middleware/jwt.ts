import { UserService } from "../src/user/user.serivce";
import { RequestType } from "../utils/req.type";
export const isJWTAuthenticated = async (req: RequestType) => {
  const { set, bearer, jwt } = req;
  if (!bearer) {
    set.status = 400;
    set.headers[
      "WWW-Authenticate"
    ] = `Bearer realm='sign', error="invalid_request"`;

    return "Token not found";
  }

  const replaceToken = bearer.replace("Bearer ", "");
  const { userId } = await jwt.verify(replaceToken);
  if (!userId) {
    set.status = 401;
    return "Unauthorized";
  }
  const userService = new UserService();
  try {
    const auth = await userService.getById(userId);
    if (!auth) {
      set.status = 401;
      return "Unauthorized";
    }
  } catch (_) {
    set.status = 401;
    return "Unauthorized";
  }
};
