import { RequestType } from "../../utils/req.type";
import { UserService } from "../user/user.serivce";

export default class AuthController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login(req: RequestType) {
    const { body, jwt, setCookie } = req;
    const { email, password } = body;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const verifyPassword = await Bun.password.verify(password, user.password);
    if (!verifyPassword) {
      throw new Error("password not match");
    }
    const accessToken = await jwt.sign({
      userId: user._id,
    });
    // Note: use auth cookie
    // setCookie("access_token", accessToken, {
    //   maxAge: 15 * 60,
    // });
    return { token: accessToken };
  }
}
