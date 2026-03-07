import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import PortalCard from "@/components/portal/PortalCard";
import FileRow from "@/components/portal/FileRow";
import { FolderOpen } from "lucide-react";

/* ---------- Types ---------- */

interface FileRecord {
  id: string;
  file_name: string;
  file_size: number | null;
  storage_path: string;
  created_at: string;
  workstream_id: string | null;
}

interface Pillar {
  name: string;
  number: string;
}

interface Workstream {
  id: string;
  pillar: Pillar | null;
}

/* ---------- Page ---------- */

export default async function FilesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: clientUser } = await supabase
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .single();

  if (!clientUser) redirect("/login");

  // Get client's active engagement
  const { data: engagement } = await supabase
    .from("engagements")
    .select("id")
    .eq("client_id", clientUser.client_id)
    .eq("status", "active")
    .single();

  if (!engagement) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          Files
        </h1>
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8 text-brand-cyan" />
          </div>
          <p className="text-brand-muted">
            No active engagement found. Files will appear here once your project
            begins.
          </p>
        </div>
      </div>
    );
  }

  // Fetch all files for this engagement
  const { data: files } = await supabase
    .from("files")
    .select("*")
    .eq("engagement_id", engagement.id)
    .order("created_at", { ascending: false });

  // Fetch workstreams to group files
  const { data: workstreams } = await supabase
    .from("workstreams")
    .select("id, pillar:pillars(name, number)")
    .eq("engagement_id", engagement.id);

  const allFiles = (files || []) as FileRecord[];
  const wsMap = new Map<string, Pillar | null>();

  if (workstreams) {
    for (const ws of workstreams as unknown as Workstream[]) {
      wsMap.set(ws.id, ws.pillar);
    }
  }

  // Group files by workstream pillar name
  const grouped: Record<string, FileRecord[]> = {};
  const ungrouped: FileRecord[] = [];

  for (const file of allFiles) {
    if (file.workstream_id && wsMap.has(file.workstream_id)) {
      const pillar = wsMap.get(file.workstream_id);
      const groupName = pillar?.name || "General";
      if (!grouped[groupName]) grouped[groupName] = [];
      grouped[groupName].push(file);
    } else {
      ungrouped.push(file);
    }
  }

  // Sort group names alphabetically
  const sortedGroups = Object.keys(grouped).sort();

  const hasFiles = allFiles.length > 0;

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          Files
        </h1>
        <p className="text-brand-muted mt-1">
          All files shared across your engagement.
        </p>
      </AnimatedSection>

      {!hasFiles ? (
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-brand-cyan" />
            </div>
            <p className="text-brand-muted">No files uploaded yet.</p>
          </div>
        </AnimatedSection>
      ) : (
        <>
          {/* Grouped by workstream pillar */}
          {sortedGroups.map((groupName, index) => (
            <AnimatedSection key={groupName} delay={0.1 + index * 0.05}>
              <PortalCard className="p-6">
                <h2 className="text-base font-semibold text-brand-text mb-3">
                  {groupName}
                </h2>
                <div className="divide-y divide-brand-border/30">
                  {grouped[groupName].map((file) => (
                    <FileRow
                      key={file.id}
                      fileName={file.file_name}
                      fileSize={file.file_size ?? undefined}
                      createdAt={file.created_at}
                    />
                  ))}
                </div>
              </PortalCard>
            </AnimatedSection>
          ))}

          {/* Ungrouped files */}
          {ungrouped.length > 0 && (
            <AnimatedSection delay={0.1 + sortedGroups.length * 0.05}>
              <PortalCard className="p-6">
                <h2 className="text-base font-semibold text-brand-text mb-3">
                  General
                </h2>
                <div className="divide-y divide-brand-border/30">
                  {ungrouped.map((file) => (
                    <FileRow
                      key={file.id}
                      fileName={file.file_name}
                      fileSize={file.file_size ?? undefined}
                      createdAt={file.created_at}
                    />
                  ))}
                </div>
              </PortalCard>
            </AnimatedSection>
          )}
        </>
      )}
    </div>
  );
}
