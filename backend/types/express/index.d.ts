import { IUser } from "../../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user: IUser | null; // Specify the User type or a generic object if you want to keep it flexible
    }
  }
}
