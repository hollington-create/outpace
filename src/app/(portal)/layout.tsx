import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/portal/Sidebar";

export const metadata = {
  title: "Client Portal | Outpace",
  description: "Outpace client portal — track your engagement progress, deliverables, and files.",
};

export default async function PortalLayout({
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
    .select("*, clients(*)")
    .eq("user_id", user.id)
    .single();

  if (!clientUser) redirect("/login");

  // Admins go to admin panel
  if (clientUser.role === "admin") redirect("/admin");

  const companyName =
    (clientUser.clients as { company_name?: string } | null)?.company_name ||
    "Your Company";

  return (
    <div className="flex min-h-screen bg-brand-darkest">
      <Sidebar companyName={companyName} userEmail={user.email || ""} />

      {/* Desktop: offset by sidebar width; Mobile: offset by mobile header */}
      <main className="flex-1 min-h-screen md:ml-64 mt-14 md:mt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
