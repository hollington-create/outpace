import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin | Outpace",
  description: "Outpace admin panel — manage clients, engagements, and deliverables.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: clientUser } = await supabase
    .from("client_users")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!clientUser || clientUser.role !== "admin") redirect("/portal");

  return (
    <div className="flex min-h-screen bg-brand-darkest">
      <AdminSidebar userEmail={user.email || ""} />

      {/* Desktop: offset by sidebar width; Mobile: offset by mobile header */}
      <main className="flex-1 min-h-screen md:ml-64 mt-14 md:mt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
