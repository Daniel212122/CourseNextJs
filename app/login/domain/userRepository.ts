import { IRepository } from "@/app/core/domain/IRepository";
import { IUser } from "./IUser";

export interface UserRepository extends IRepository<IUser> {
    
}