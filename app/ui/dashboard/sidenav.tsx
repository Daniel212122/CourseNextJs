"use client"
import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import * as Feather from "react-icons/fi";
import NavLinks from './nav-links';
import Image from 'next/image';
export default function SideNav() {
  const { data } = useSession();
  console.log("Session: ", data);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard/profile"
      >
        <div className="w-32 text-white md:w-40">
          <div className="flex items-center gap-2">
        <Image
          src={data?.user?.image || '/images/defaultImage.jpeg'}
          alt="Profile"
          width={60} // Ancho en píxeles
          height={60} // Altura en píxeles
          className="rounded-full cursor-pointer"
        />
            <div>
              <p>{data?.user?.name || 'Usuario'}</p>
              <p className="text-sm">{data?.user?.email || 'email@dominio.com'}</p>
              <p>{data?.user?.provider||""}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
  <NavLinks />
    <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
  </div>
        <button 
            onClick={() => signOut({ callbackUrl: "/" })} 
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-5" />
            Sign Out
          </button>
    </div>
  );
}
