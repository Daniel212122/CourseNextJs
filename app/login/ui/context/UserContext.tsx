'use client'
import React, { createContext, useEffect, useState } from "react";
import { UserManagement } from '../../application/userManagement'
import { IUser, emptyUser} from '../../domain/IUser'
import { UserService } from "../../infrastructure/user.service";


export type UserContextType = {
    currentUser: IUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    users: IUser[] | null;
    registerUser: (user: IUser  |undefined) => Promise<void>; // Cambiar para reflejar la asincronía
    handleSubmitRegister: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; // Definición para el submit
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

    const manager = new UserManagement(new UserService());

    const registerUser = async (user: IUser | undefined): Promise<void> => {
    if (!user) {
        console.error("No user provided");
        return; // Retornamos null si el usuario no fue definido.
    }

    try {
        const data = await manager.registerUser(user); // Llama al método de UserManagement.

        if (data.success) { // Supone que 'data.success' indica el éxito de la operación.
            console.log("User registered successfully:", data);
            // setUpdateView(new Date()); // Actualiza la vista.
        } else {
            console.warn("Registration failed:", data);
            throw new Error
            // return undefined; // Devuelve undefined si no fue exitoso.
        }
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error
    // return null; // Devuelve null en caso de error.
    }
};


    const handleSubmitRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        try {
            await registerUser(currentUser);
        } catch (error) {
            console.error('Invalid register:', error);
        }
    };

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            isEdit,
            setIsEdit,
            users,
            registerUser,
            handleSubmitRegister, // Agregamos esta función al contexto
        }}>
            {children}
        </UserContext.Provider>
    );
};


// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//     const [updateView, setUpdateView] = useState(new Date());
//     const [isEdit, setIsEdit] = useState(false);
//     const [currentUser, setCurrentUser] = useState(emptyUser);
//     const [users, setUsers] = useState<IUser[] | null>(null);
//     const [roles, setRoles] = useState<string[] | null>(null);
    
//     const manager = new UserManagement(new UserService());


//     const registerUser = (user: IUser) => {
//         manager.registerUser(user).then(data => {
//             console.log('user: ', user )
//             return 'register successfully';
//         });
//     };
//     const handleSubmitRegister = async (
//         event: React.FormEvent<HTMLFormElement>
//     ) => {
//         event.preventDefault();
//         try {
//             await registerUser(currentUser);
//         } catch (error) {
//             console.error('Invalid register:', error);
//         }
//     };
//     return (
//         <UserContext.Provider value={{ 
//             currentUser, setCurrentUser, 
//             isEdit, setIsEdit, 
//             users, 
//             // roles,
//             registerUser, 
//             // updateUser, 
//             // deleteUser,
//             handleSubmitRegister, 
//             }}>
//             {children}
//         </UserContext.Provider>
//     );
// };


