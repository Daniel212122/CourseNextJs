import { IUser } from "../domain/IUser";
import { UserRepository } from "../domain/userRepository";
import Cookies from 'js-cookie';


export class UserService implements UserRepository{
    // private apiBasePath = "http://localhost:4000/dev/user"; 
    private apiBasePath = process.env.BASEPATH_API_USERS;
    // private apiBasePath = 'https://a9ub0zdqbh.execute-api.us-east-1.amazonaws.com/dev/user';

    constructor(){
    
    }
    getAll(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    async add(entity: IUser): Promise<IUser> {
        // console.log("entity: ", entity);
            const resp = await fetch(this.apiBasePath+"/dev/user", {
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
        // console.log("respText: ", respText)
        // console.log("resp: ", resp)
        if (resp.status == 200) {
            try {       
                // console.log("resp: ", resp)      
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
        // console.log("token: ", entity.token)
        // console.log("entity: ", entity)
        const {name, lastname, phonenumber,password, email} = entity
        const data = {name, lastname, phonenumber,password, email}
        // if(){
        //     throw new Error('No token found, please log in again');
        // }
        const resp = await fetch(this.apiBasePath+ "/dev/user", {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${entity.token}`
            },
            mode: 'cors',
            body: JSON.stringify({ user: data, email: data.email }),
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {                
                return Promise.resolve(await resp.json());
              } catch (e) {
                // console.log("error: " + e);
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
    async delete(entity: IUser): Promise<void> {
        // console.log("Entity: ", entity)
        // console.log("token: ", entity.token)
        const resp = await fetch(this.apiBasePath+"/dev/user/"+ entity.email, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${entity.token}`
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