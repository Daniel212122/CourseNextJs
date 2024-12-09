// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import {z} from 'zod';
// import { sql } from '@vercel/postgres';
// import type { User } from '@/app/lib/definitions';
// import bcrypt from 'bcrypt';
 
// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     console.log("user: ", user)
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//         async authorize(credentials) {
//           console.log("getUser", getUser)
//           const parsedCredentials = z
//             .object({ email: z.string().email(), password: z.string().min(6) })
//             .safeParse(credentials);
//             console.log("parsedCredentials", parsedCredentials)
//             if (parsedCredentials.success) {

//                 const { email, password } = parsedCredentials.data;
//                 const user = await getUser(email);
//                 if (!user) return null;
//                 const passwordsMatch = await bcrypt.compare(password, user.password);

//                 if (passwordsMatch) return user;
//               }
//             console.log('Invalid credentials');
//             return null;
        
//         },
//       }),
//     ],
    
// });

                    //Serverless AWS Dynamo


import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { User as NextAuthUser } from 'next-auth';
import type { User as CustomUser } from '@/app/lib/definitions';

type ExtendedUser = NextAuthUser & CustomUser;

// import type { User } from '@/app/lib/definitions';
async function getUser(email: string, password: string): Promise<ExtendedUser | undefined> {
  try {
    // Realizamos la llamada al endpoint POST para obtener el usuario
    const response = await fetch('http://localhost:4000/dev/user/login', {
      method: 'POST',  // Usamos POST para enviar la información
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),  // Mandamos email y password en el cuerpo
    });

    if (!response.ok) {
      console.error('Failed to fetch user:', response.statusText);
      return undefined; // Si la respuesta no es exitosa, retornamos null
    }

    const user = await response.json();
    console.log("Fetched user data: ", user); 
    return user; // Devolvemos el objeto de usuario recibido
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user.');
  }
  
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    
    Credentials({
      async authorize(credentials) {
        console.log("getUser: ", getUser)

        // Validación de las credenciales usando Zod
        const parsedCredentials = z
          .object({
            email: z.string().email(), // Validación de email
            password: z.string().min(6), // Validación de la contraseña
          })
          .safeParse(credentials);
      console.log('parsedCredentials: ', parsedCredentials)
        if (!parsedCredentials.success) {
          console.log('Invalid credentials format');
          return null;  // Si las credenciales no son válidas, retornar null
        }

        const { email, password } = parsedCredentials.data; // Desestructuramos las credenciales
       //prueba de datos 
        // const [email, password] = ['daniel@gmail.com', '123456']; ; // Desestructuramos las credenciales

        // Llamamos al endpoint para obtener el usuario
        const user = await getUser(email, password);
        if (!user) {
          console.log('User not found: user: ', user);
          return null;  // Si no se encuentra el usuario, retornar null
        }
        console.log('prueba 108')
        console.log(user)
        console.log(password)
        console.log(user.user.password)
        console.log(email)

        
        // Verificamos que la contraseña coincida
        const passwordMatch = await bcrypt.compare(password, user.user.password);
        console.log('passwordMatch: ', passwordMatch)
        if (passwordMatch) {
          console.log('Password matches, user authenticated');
          return user; // Si las contraseñas coinciden, retornar el usuario
        }

        console.log('Invalid password');
        return null;  // Si las contraseñas no coinciden, retornar null
      },
    }),
  ],
});
