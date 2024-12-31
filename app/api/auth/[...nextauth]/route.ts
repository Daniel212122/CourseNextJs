import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
// import { useRouter } from "next/navigation";
// const router = useRouter();
const handler = NextAuth({
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
            // Add logic here to look up the user from the credentials supplied
            const res = await fetch(
              `https://a9ub0zdqbh.execute-api.us-east-1.amazonaws.com/dev/user/login`,
            // `http://localhost:4000/dev/user/login`,
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
            console.log("user: ", user)
            // if (user.error) throw user;
            
            if (user.error){
                console.log("userError: ", user) 
                throw user;
            } 
            return user;
          }
        }),
      ],
      callbacks: {
        async jwt({ token, user, account }) {
          if(account)token.provider = account.provider;
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.phonenumber = user.phonenumber;
            token.name = user.name;
            token.lastname = user.lastname;
            token.status = user.status;
            token.role = user.role;
            token.image = user.image;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = {
            id: token.id as string | undefined,
            email: token.email as string | undefined,
            phonenumber: token.phonenumber as string | undefined,
            name: token.name as string | undefined,
            lastname: token.lastname as string | undefined,
            password: token.password as string | undefined,
            status: token.status as string | undefined,
            role: token.role as string | undefined,
            image: token.image as string | undefined,
            provider: token.provider as string | undefined,
          };
          return session;
        },
      },
      pages: {
        signIn:"/login"
      }
})

export { handler as GET, handler as POST}