import { IUser } from "../domain/IUser";
import { UserRepository } from "../domain/userRepository";

export class UserService implements UserRepository{
    // private apiBasePath = "http://localhost:4000/dev/user"; 
    private apiBasePath = 'https://a9ub0zdqbh.execute-api.us-east-1.amazonaws.com/dev/user';

    constructor(){
    
    }
    getAll(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }

    async add(entity: IUser): Promise<IUser> {
        console.log("entity: ", entity);
        // const resp = await fetch('https://a9ub0zdqbh.execute-api.us-east-1.amazonaws.com/dev/user/register', {
            const resp = await fetch(this.apiBasePath + '/register', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(entity),
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {             
                return Promise.resolve(await resp.json());
              } catch (e) {
                //console.log("error: " + e);
                const errorTxt = await respText.text();
                throw new Error(errorTxt);
              }
        } else {
            let errorTxt = '';
            try{
                let errorJson = await resp.json();
                if (errorJson.hasOwnProperty('message')) {
                    errorTxt = errorJson.message;
                }else{
                    errorTxt = 'Unexpected error';
                }
            }catch(e:any){
                errorTxt = await resp.text();
            }finally{
                throw new Error(errorTxt);
            }
        }
    }

    async update(entity: IUser): Promise<IUser> {
        const resp = await fetch(this.apiBasePath +"/update", {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ user: entity, email: entity.email }),
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {                
                return Promise.resolve(await resp.json());
              } catch (e) {
                console.log("error: " + e);
                const errorTxt = await respText.text();
                throw new Error(errorTxt);
              }
        } else {

            let errorTxt = '';
            try{
                let errorJson = await resp.json();
                if (errorJson.hasOwnProperty('message')) {
                    errorTxt = errorJson.message;
                }else{
                    errorTxt = 'Unexpected error';
                }
            }catch(e:any){
                errorTxt = await resp.text();
            }finally{
                throw new Error(errorTxt);
            }
            
        }
    }
    async delete(id: string): Promise<void> {
        const resp = await fetch(this.apiBasePath + id, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            return Promise.resolve();
        } else {

            let errorTxt = '';
            try{
                let errorJson = await resp.json();
                if (errorJson.hasOwnProperty('message')) {
                    errorTxt = errorJson.message;
                }else{
                    errorTxt = 'Unexpected error';
                }
            }catch(e:any){
                errorTxt = await resp.text();
            }finally{
                throw new Error(errorTxt);
            }
            
        }
    }

}