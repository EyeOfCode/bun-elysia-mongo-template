import { UserService } from "./user.serivce";

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getList() {
    return this.userService.list();
  }

  async create(name: string) {
    return this.userService.create(name);
  }

  async getById(id: string) {
    return { id };
  }
}
