"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  MessageSquare, 
  Image as ImageIcon,
  Settings,
  LogOut
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Locations", href: "/admin/locations", icon: MapPin },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold">AccraLife</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-6 mt-auto absolute bottom-4">
            <button className="flex items-center text-red-500 hover:text-red-700">
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}