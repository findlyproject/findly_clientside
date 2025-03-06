import Sidebar from "@/components/admin/SideBar";
import "@/styles/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#f1f5f9]">
      {/* Sidebar (Left) */}
      <aside className="w-14  bg-white md:w-15 lg:w-[230px]  shadow-md">
        <Sidebar />
      </aside>

      {/* Main Content (Right) */}
      <main className="ml-10 overflow-auto w-full bg-[#f1f5f9]">{children}</main>
    </div>
  );
}
