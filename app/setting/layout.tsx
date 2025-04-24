import { SlideMenu } from "@/components/setting/slide-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SlideMenu>{children}</SlideMenu>
    </div>
  );
}
