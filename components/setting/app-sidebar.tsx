"use client";
import { ChevronDown, ChevronUp, House, Settings, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { signOut } from "next-auth/react";
import { useSession } from "@/hooks/useSession";
import Link from "next/link";

const menuList = [
  {
    name: "首页",
    href: "/setting",
    icon: <House className="mr-[10px]" />,
  },
  {
    name: "系统管理",
    href: "#",
    icon: <Settings className="mr-[10px]" />,
    children: [
      {
        name: "角色管理",
        href: "/setting/system/role",
      },
      {
        name: "用户管理",
        href: "/setting/user",
      },
      {
        name: "权限管理",
        href: "/setting/permission",
      },
    ],
  },
];

export function AppSidebar() {
  const { session } = useSession();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupContent className="p-2">
          {menuList.map((item) => (
            <SidebarGroup key={item.name}>
              {item.children ? (
                <Collapsible>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="w-full flex items-center !text-[15px] ">
                      {item.icon}
                      {item.name}
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarMenu className="pl-[30px]">
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.href} className="py-1">
                          <SidebarMenuButton asChild>
                            <Link href={child.href}>
                              <span>{child.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenu>
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="text-[15px]">
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </SidebarGroup>
          ))}
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => signOut()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
