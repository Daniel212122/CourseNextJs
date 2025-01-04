import { IUser } from "../domain/IUser";
import { UserRepository } from "../domain/userRepository";

export class UserManagement {
    constructor(private readonly userRepository: UserRepository){        
        this.userRepository = userRepository;
    }

    async registerUser(user: IUser): Promise <{success: boolean; user: IUser|null}> {
        try {
            const responseUser = await this.userRepository.add(user);
            return {success: true, user: responseUser};
        }catch(error){
            // console.error("add error: ", error)
            return {success: false, user: null}
        }}

    async updateUser(email: string, user: IUser): Promise <{success: boolean; user: IUser|null}> {
        try {
            const responseUser = await this.userRepository.update(user);
            return {success: true, user: responseUser};
        } catch (error) {
            // console.error("update error: ", error)
            return { success: false, user: null}
        }
    }

    async deleteUser(entity: IUser): Promise <{success: boolean; user: IUser|null}> {
        try {
            await this.userRepository.delete(entity);
            return {success: true, user: null};
        } catch (error) {
            // console.error("delete error: ", error)
            return {success: false, user: null}
        } 
    }
}