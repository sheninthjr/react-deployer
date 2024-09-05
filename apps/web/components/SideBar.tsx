'use client';
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Dashboard } from './Dashboard';
import { getUserDetails } from '@/hooks/userDetails';

export function SideBar() {
  const userName = getUserDetails().username;
  const onClickLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const links = [
    {
      label: 'Dashboard',
      href: '#',
      icon: (
        <IconBrandTabler className="text-white dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Profile',
      href: '#',
      icon: (
        <IconUserBolt className="text-white dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Settings',
      href: '#',
      icon: (
        <IconSettings className="text-white dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'rounded-md flex flex-col text-white md:flex-row bg-black dark:bg-neutral-800 w-full flex-1 overflow-hidden',
        'h-screen',
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 bg-gray-950">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden text-white">
            {<Logo />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {userName && (
              <div
                onClick={onClickLogout}
                className="text-xl font-bold flex items-center gap-2 justify-center"
              >
                <div>
                  <IconArrowLeft className="text-white dark:text-white h-5 w-5 flex-shrink-0" />
                </div>
                <div onClick={onClickLogout}>Logout</div>
              </div>
            )}
            <div className="text-2xl font-bold flex justify-center pb-2">
              {userName}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" text-white dark:text-white whitespace-pre font-bold text-3xl"
      >
        Jr Deployer
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
