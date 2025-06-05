"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface Props {
  menuList: {
    path: string;
    name: string;
  }[];
}
export const LinkList = ({ menuList }: Props) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center max-md:hidden">
      <div className="nav-item space-x-[40px]">
        {menuList.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={clsx({
              "text-theme-primary": pathname === item.path,
              "font-bold": pathname === item.path,
            })}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
