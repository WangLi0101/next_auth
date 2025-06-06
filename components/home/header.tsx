"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { LinkList } from "./link-list";
import { usePathname } from "next/navigation";
import { DarkCahnge } from "./dark-change";

export const Header = () => {
  const menuList = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/about",
      name: "About",
    },
  ];
  const pathname = usePathname();
  const isShow = menuList.some((item) => item.path === pathname);
  if (!isShow) {
    return null;
  }
  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300 ",
        "bg-theme-bg",

        "max-md:shadow-[0]"
      )}
    >
      <div className="w-[85%] mx-auto flex justify-between items-center h-20">
        <Link href="/" className="logo cursor-pointer">
          <Image src="/home/logo.svg" alt="logo" width={150} height={50} />
        </Link>
        <LinkList menuList={menuList} />
        <div className="right flex items-center">
          <DarkCahnge />
        </div>
      </div>
    </header>
  );
};
