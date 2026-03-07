import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Outpace. Book a discovery call, send us a message, or drop into our Limerick office. We respond within 24 hours.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Office",
    value: "Limerick, Ireland",
    href: null,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@outpace.ie",
    href: "mailto:hello@outpace.ie",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+353 (0) 000 000 000",
    href: "tel:+3530000000000",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text max-w-4xl leading-tight">
              Let&apos;s talk about your growth
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              Book a free discovery call or send us a message. We&apos;ll
              respond within 24 hours with insights tailored to your business.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="p-8 sm:p-10 rounded-2xl bg-brand-dark/80 border border-brand-border/50">
                  <h2 className="text-2xl font-bold text-brand-text mb-8">
                    Send us a message
                  </h2>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div>
              <AnimatedSection delay={0.2}>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div
                      key={item.label}
                      className="p-6 rounded-2xl bg-brand-dark/80 border border-brand-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                          <item.icon className="text-brand-cyan-bright" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-brand-muted uppercase tracking-wider">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-brand-text font-medium hover:text-brand-cyan transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-brand-text font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-emerald/5 border border-brand-cyan/20">
                  <h3 className="text-lg font-bold text-brand-text">
                    Book a Discovery Call
                  </h3>
                  <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                    Prefer to jump straight to a call? We&apos;ll spend 30
                    minutes understanding your business, identifying
                    opportunities, and exploring whether we&apos;re the right
                    fit.
                  </p>
                  <p className="mt-4 text-sm text-brand-muted">
                    Email{" "}
                    <a
                      href="mailto:hello@outpace.ie"
                      className="text-brand-cyan-bright hover:text-brand-cyan transition-colors"
                    >
                      hello@outpace.ie
                    </a>{" "}
                    to schedule.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
