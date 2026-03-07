-- ========================================
-- OUTPACE CLIENT PORTAL
-- ========================================

-- Lookup table for the 10 service pillars
CREATE TABLE IF NOT EXISTS pillars (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  number TEXT NOT NULL,
  icon_name TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

INSERT INTO pillars (id, name, number, icon_name, sort_order) VALUES
  ('business_analysis', 'Consultative Business Analysis', '01', 'Search', 1),
  ('lead_generation', 'Lead Generation & Outbound Sales', '02', 'Mail', 2),
  ('digital_presence', 'Digital Presence & Paid Media', '03', 'Globe', 3),
  ('systems_operations', 'Systems & Operations', '04', 'Settings', 4),
  ('content_brand', 'Content & Video', '05', 'Video', 5),
  ('ai_growth_tools', 'AI-Powered Growth Tools', '06', 'Bot', 6),
  ('sales_enablement', 'Sales Enablement & Training', '07', 'BookOpen', 7),
  ('client_retention', 'Customer Retention & Growth', '08', 'Heart', 8),
  ('brand_positioning', 'Brand Positioning & GTM Strategy', '09', 'Crosshair', 9),
  ('partnerships', 'Partnerships & Referral Programmes', '10', 'Handshake', 10)
ON CONFLICT (id) DO NOTHING;

-- Clients (companies)
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_role TEXT,
  employee_count TEXT,
  location TEXT,
  notes TEXT,
  consultation_id UUID REFERENCES consultations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client users (links Supabase Auth users to client companies)
CREATE TABLE IF NOT EXISTS client_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  display_name TEXT,
  email TEXT,
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_client_users_user_id ON client_users(user_id);
CREATE INDEX IF NOT EXISTS idx_client_users_client_id ON client_users(client_id);

-- Engagements (overall project for a client)
CREATE TABLE IF NOT EXISTS engagements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Growth Engagement',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  start_date DATE,
  target_end_date DATE,
  key_contact TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_engagements_client_id ON engagements(client_id);

-- Workstreams (one per active pillar within an engagement)
CREATE TABLE IF NOT EXISTS workstreams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  engagement_id UUID NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
  pillar_id TEXT NOT NULL REFERENCES pillars(id),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'on_hold')),
  progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  notes TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workstreams_engagement_id ON workstreams(engagement_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_workstreams_engagement_pillar ON workstreams(engagement_id, pillar_id);

-- Deliverables (items within a workstream)
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workstream_id UUID NOT NULL REFERENCES workstreams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'cancelled')),
  due_date DATE,
  assignee_notes TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deliverables_workstream_id ON deliverables(workstream_id);

-- Updates (activity feed entries)
CREATE TABLE IF NOT EXISTS updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  engagement_id UUID NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
  workstream_id UUID REFERENCES workstreams(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'milestone', 'deliverable', 'meeting', 'note')),
  content TEXT NOT NULL,
  author_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_updates_engagement_id ON updates(engagement_id);
CREATE INDEX IF NOT EXISTS idx_updates_created_at ON updates(created_at DESC);

-- Files (metadata; actual files stored in Supabase Storage)
CREATE TABLE IF NOT EXISTS files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  engagement_id UUID NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
  workstream_id UUID REFERENCES workstreams(id) ON DELETE SET NULL,
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  storage_path TEXT NOT NULL,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_files_engagement_id ON files(engagement_id);
CREATE INDEX IF NOT EXISTS idx_files_workstream_id ON files(workstream_id);

-- ========================================
-- RLS POLICIES
-- ========================================

ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE workstreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Pillars: public read
CREATE POLICY "Pillars are publicly readable" ON pillars
  FOR SELECT USING (true);

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM client_users
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: get client_id for current user
CREATE OR REPLACE FUNCTION user_client_id()
RETURNS UUID AS $$
  SELECT client_id FROM client_users
  WHERE user_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Clients
CREATE POLICY "Admins can do everything on clients" ON clients
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Clients can view their own company" ON clients
  FOR SELECT USING (id = user_client_id());

-- Client users
CREATE POLICY "Admins can do everything on client_users" ON client_users
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Users can view their own record" ON client_users
  FOR SELECT USING (user_id = auth.uid());

-- Engagements
CREATE POLICY "Admins can do everything on engagements" ON engagements
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Clients can view their own engagements" ON engagements
  FOR SELECT USING (client_id = user_client_id());

-- Workstreams
CREATE POLICY "Admins can do everything on workstreams" ON workstreams
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Clients can view their own workstreams" ON workstreams
  FOR SELECT USING (
    engagement_id IN (
      SELECT id FROM engagements WHERE client_id = user_client_id()
    )
  );

-- Deliverables
CREATE POLICY "Admins can do everything on deliverables" ON deliverables
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Clients can view their own deliverables" ON deliverables
  FOR SELECT USING (
    workstream_id IN (
      SELECT w.id FROM workstreams w
      JOIN engagements e ON w.engagement_id = e.id
      WHERE e.client_id = user_client_id()
    )
  );

-- Updates
CREATE POLICY "Admins can do everything on updates" ON updates
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Clients can view their own updates" ON updates
  FOR SELECT USING (
    engagement_id IN (
      SELECT id FROM engagements WHERE client_id = user_client_id()
    )
  );

-- Files
CREATE POLICY "Admins can do everything on files" ON files
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Clients can view their own files" ON files
  FOR SELECT USING (
    engagement_id IN (
      SELECT id FROM engagements WHERE client_id = user_client_id()
    )
  );
