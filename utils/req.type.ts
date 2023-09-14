import { IUser } from "../src/user/interface/user.interface";

export type RequestType = {
  request?: Request;
  headers?: Record<string, string | null>;
  query?: Record<string, unknown>;
  params?: Record<never, string> | any;
  body: any;
  store?: {};
  path?: string;
  set: {
    headers: { [header: string]: string } & {
      "Set-Cookie"?: string | string[] | undefined;
    };
    status?: number | undefined;
    redirect?: string | undefined;
  };
  cookie?: any;
  jwt?: any;
  setCookie?: any;
  bearer?: any;
  auth?: IUser;
};
