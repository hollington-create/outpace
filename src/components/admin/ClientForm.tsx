"use client";

import { useState, useEffect } from "react";

interface ClientData {
  id?: string;
  company_name: string;
  industry: string;
  website: string;
  contact_name: string;
  contact_email: string;
  contact_role: string;
  employee_count: string;
  location: string;
  notes: string;
}

interface ClientFormProps {
  client?: {
    id: string;
    company_name: string;
    industry: string | null;
    website: string | null;
    contact_name: string | null;
    contact_email: string | null;
    contact_role: string | null;
    employee_count: string | null;
    location: string | null;
    notes: string | null;
  };
  onSave: (data: ClientData) => void;
  loading?: boolean;
}

const INPUT_CLASSES =
  "w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm";

const LABEL_CLASSES = "block text-sm font-medium text-brand-muted mb-1.5";

export default function ClientForm({ client, onSave, loading }: ClientFormProps) {
  const [form, setForm] = useState<ClientData>({
    company_name: "",
    industry: "",
    website: "",
    contact_name: "",
    contact_email: "",
    contact_role: "",
    employee_count: "",
    location: "",
    notes: "",
  });

  useEffect(() => {
    if (client) {
      setForm({
        id: client.id,
        company_name: client.company_name || "",
        industry: client.industry || "",
        website: client.website || "",
        contact_name: client.contact_name || "",
        contact_email: client.contact_email || "",
        contact_role: client.contact_role || "",
        employee_count: client.employee_count || "",
        location: client.location || "",
        notes: client.notes || "",
      });
    }
  }, [client]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Company Name */}
        <div className="sm:col-span-2">
          <label htmlFor="company_name" className={LABEL_CLASSES}>
            Company Name <span className="text-red-400">*</span>
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            required
            value={form.company_name}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className={LABEL_CLASSES}>
            Industry
          </label>
          <input
            id="industry"
            name="industry"
            type="text"
            value={form.industry}
            onChange={handleChange}
            placeholder="e.g. SaaS, Retail, Healthcare"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className={LABEL_CLASSES}>
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            value={form.website}
            onChange={handleChange}
            placeholder="https://example.com"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contact_name" className={LABEL_CLASSES}>
            Contact Name
          </label>
          <input
            id="contact_name"
            name="contact_name"
            type="text"
            value={form.contact_name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contact_email" className={LABEL_CLASSES}>
            Contact Email
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            value={form.contact_email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Contact Role */}
        <div>
          <label htmlFor="contact_role" className={LABEL_CLASSES}>
            Contact Role
          </label>
          <input
            id="contact_role"
            name="contact_role"
            type="text"
            value={form.contact_role}
            onChange={handleChange}
            placeholder="CEO, Marketing Director, etc."
            className={INPUT_CLASSES}
          />
        </div>

        {/* Employee Count */}
        <div>
          <label htmlFor="employee_count" className={LABEL_CLASSES}>
            Employee Count
          </label>
          <input
            id="employee_count"
            name="employee_count"
            type="text"
            value={form.employee_count}
            onChange={handleChange}
            placeholder="e.g. 10-50"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label htmlFor="location" className={LABEL_CLASSES}>
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="Limerick, Ireland"
            className={INPUT_CLASSES}
          />
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={LABEL_CLASSES}>
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="Any additional notes about this client..."
            className={`${INPUT_CLASSES} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !form.company_name.trim()}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Saving...
          </span>
        ) : client ? (
          "Save Changes"
        ) : (
          "Create Client"
        )}
      </button>
    </form>
  );
}
