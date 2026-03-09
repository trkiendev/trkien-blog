import { getAuthUser } from "@/lib/auth/get-auth-user";
import AdminSidebar from "./components/admin-sidebar/admin-sidebar"; 
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
      const user = await getAuthUser();

      if(!user) {
            redirect('/login');
      }

      return (
            <section className="flex min-h-screen overflow-y-hidden">
                  <aside className="w-55 shrink-0 sticky top-0 h-screen">
                        <AdminSidebar />
                  </aside>
                  <div className="flex-1 flex flex-col">
                        <main className="secondary-bg-color p-4 flex-1">{ children }</main>
                  </div>
            </section>
      );
}