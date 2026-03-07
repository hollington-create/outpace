import Link from "next/link";

interface PortalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function PortalCard({
  children,
  className = "",
  onClick,
  href,
}: PortalCardProps) {
  const baseClasses =
    "rounded-2xl bg-brand-dark/60 backdrop-blur-sm border border-brand-border/50 transition-all duration-200 hover:border-brand-border";

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full text-left ${baseClasses} ${className}`}
      >
        {children}
      </button>
    );
  }

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
}
