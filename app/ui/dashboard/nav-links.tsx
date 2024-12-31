'use client'; 

import { 
  UserGroupIcon, 
  HomeIcon, 
  DocumentDuplicateIcon, 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import * as Feather from "react-icons/fi";
import { useState } from 'react';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', 
    href: '/dashboard', 
    icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', 
    href: '/dashboard/customers', 
    icon: UserGroupIcon 
  },
];

const dropdownLinks = [
  {
    name: 'Profile',
    href: "/dashboard/profile",
    icon: Feather.FiUser
  },
  {
    name: "Analytics",
    href: "/analitics",
    icon: Feather.FiPieChart
  },
  {
    name: "Settings and Privacy",
    href: "/settings", 
    icon: Feather.FiSettings
  },
  {
    name: "Help Center", 
    href: "/hselp", 
    icon: Feather.FiHelpCircle
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <Feather.FiMenu className="w-6" />
          <p className="hidden md:block">More</p>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
            {dropdownLinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  <LinkIcon className="w-5" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
