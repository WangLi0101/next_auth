import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function SlideMenu({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-full flex flex-col flex-1">
        <SidebarTrigger />
        <div className="p-5 flex-1 overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
