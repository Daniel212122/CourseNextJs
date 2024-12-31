// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: 'Customers',
"use client"
import { useSession } from "next-auth/react";

// };
export default function customers() {
  const {data: session, status} = useSession();
  console.log("USER: ", session)  
  if(status === "loading"){
    return <p> Loading...</p>
  }
  // console.log(session)
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>  
  );
} 