import NextAuth from "next-auth";
import { IUser } from "./app/login/domain/IUser";

declare module "next-auth" {
  interface Session {
    user: IUser; // Usamos la interfaz IUser para definir la estructura del usuario
  }

  interface User extends IUser {} // Extender la interfaz User de NextAuth para incluir IUser
}
