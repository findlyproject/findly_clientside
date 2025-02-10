import Sidebar from "@/components/admin/SideBar"; // Import Sidebar component
import "@/styles/globals.css"; // Import global styles (optional)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex ">
          {/* Sidebar (Left) */}
          <aside className="w-70 shadow-md">
            <Sidebar />
          </aside>

          {/* Main Content (Right) */}
          <main className="flex-1 p-6 overflow-auto bg-[#f1f5f9]">{children}</main>
        </div>
      </body>
    </html>
  );
}
