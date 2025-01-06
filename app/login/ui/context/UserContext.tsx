'use client'
import React, { createContext, useEffect, useState } from "react";
import { UserManagement } from '../../application/userManagement'
import { IUser, emptyUser} from '../../domain/IUser'
import { UserService } from "../../infrastructure/user.service";
import { signOut, useSession } from "next-auth/react";

export type UserContextType = {
    currentUser: IUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    users: IUser[] | null;
    registerUser: (user: IUser)=>void;
    updateUser: (user: IUser) => void; 
    deleteUser: (user: IUser) => void;
    registered: string;
    updated: string;
};


// Creamos un contexto para manejar los productos
export const UserContext = createContext<UserContextType | null>(null);

export type UserProviderProps = {
    children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [updateView, setUpdateView] = useState(new Date());
    const [isEdit, setIsEdit] = useState(false);
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const {data} = useSession();
    const [registered, setRegistered ] = useState("Registered")
    const [updated, setupdated ] = useState("Updated")
    const manager = new UserManagement(new UserService());

    const registerUser = async (user: IUser | undefined): Promise<IUser| null> => {
    console.log("user: ", user)
        if (!user) {
            setRegistered("No se ingresaron datos de usuario")
            console.error("No user provided");
        return null  // Retornamos null si el usuario no fue definido.
    }

    try {
        const data = await manager.registerUser(user); 
        console.log("data: ", data)
        if (data.success) {
            setRegistered("Registered")
            return data.user
        } else {
            console.log("Registration failed:", data);
            setRegistered("The email is already registered")
            throw new Error
            // return undefined; // Devuelve undefined si no fue exitoso.
        }
        
    } catch (error) {
        setRegistered("Server error")
        console.error("Error registering user:", error);
        throw new Error
    }
};

const updateUser = async (user: IUser): Promise<void> => {
    // console.log("user: ", user)
    if (!user) {
        setupdated("No user provided");
        return; // Retornamos null si el usuario no fue definido.
    }

    try {
        const dato = await manager.updateUser(user.email, user ); // Llama al método de UserManagement.

        if (dato.success) { // Supone que 'data.success' indica el éxito de la operación.
            setupdated("Updated")
        } else {
            setupdated("Error updated")
            throw new Error
            // return undefined; // Devuelve undefined si no fue exitoso.
        }
    } catch (error) {
        setupdated("Server error")
        // console.error("Error registering user:", error);
        throw new Error
    // return null; // Devuelve null en caso de error.
    }
};
    const deleteUser = (user:IUser)=>{
        manager.deleteUser(user).then(data =>{
            if(data.success){
              signOut({callbackUrl: "/"})
            }
        })
    }


    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            isEdit,
            setIsEdit,
            users,
            registerUser,
            updateUser,
            deleteUser,
            registered,
            updated,
            // handleSubmitRegister, // Agregamos esta función al contexto
        }}>
            {children}
        </UserContext.Provider>
    );
};
