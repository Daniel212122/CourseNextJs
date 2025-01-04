import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
// import { useRouter } from "next/navigation";
// const router = useRouter();

const handler= NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "email", type: "email", placeholder: "test@test.com" },
            password: { label: "Password", type: "password" }
          },

          async authorize(credentials, req) {
            const apiBasePath= process.env.BASEPATH_API_USERS as string;
            // Add logic here to look up the user from the credentials supplied
            const res = await fetch(
            apiBasePath + '/dev/user/login',
              {
                method: "POST",
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
                headers: { "Content-Type": "application/json" },
              }
            );
            const user = await res.json();
            console.log("user.message: ", user.message)
            // if (user.error) throw user;
            
            if (user.message == "Authentication"){
              return user;
            } 
              throw user;
          }
        }),
      ],
      
        callbacks: {
          async jwt({ token, user, account }) {
            return{...token,...user,...account}
            },
            // console.log("jwt: ", [token, user])
          async session({ session, token }) {
            session.user = token as any
            return session;
          },
        },
        pages: {
          signIn:"/login"
      },
    })
export { handler as GET, handler as POST}