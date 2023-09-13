import { User } from "./entities/user.entities";

export class UserService {
  private userModel = User;
  constructor() {}

  async list() {
    return this.userModel.find();
  }

  async create(name: string) {
    const newData = new User({
      name,
    });
    return newData.save();
  }
}
