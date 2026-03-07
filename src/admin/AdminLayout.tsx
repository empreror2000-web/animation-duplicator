import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Wrench, FolderOpen, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { initializeStore } from "./store";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/tools", icon: Wrench, label: "Tools" },
  { to: "/admin/categories", icon: FolderOpen, label: "Categories" },
];

const AdminLayout = () => {
  const location = useLocation();

  useEffect(() => { initializeStore(); }, []);

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">WinoxTools Admin</h2>
          <p className="text-xs text-muted-foreground">Manage your tools</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Admin</h2>
        <div className="flex gap-2">
          {navItems.map((item) => {
            const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                )}
              >
                <item.icon className="w-4 h-4" />
              </Link>
            );
          })}
          <Link to="/" className="p-2 rounded-lg text-muted-foreground hover:bg-accent">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 md:p-6 p-4 pt-16 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
