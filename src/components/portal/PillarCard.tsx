import { PILLAR_ICONS } from "@/lib/pillar-icons";
import PortalCard from "./PortalCard";
import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";

interface PillarCardProps {
  pillarName: string;
  pillarNumber: string;
  iconName: string;
  status: string;
  progress: number;
  completedDeliverables: number;
  totalDeliverables: number;
  href: string;
}

export default function PillarCard({
  pillarName,
  pillarNumber,
  iconName,
  status,
  progress,
  completedDeliverables,
  totalDeliverables,
  href,
}: PillarCardProps) {
  const Icon = PILLAR_ICONS[iconName];

  return (
    <PortalCard href={href} className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
            {Icon ? <Icon size={20} /> : null}
          </div>
          <div>
            <p className="text-xs text-brand-muted font-medium uppercase tracking-wider">
              {pillarNumber}
            </p>
            <h3 className="text-sm font-semibold text-brand-text">
              {pillarName}
            </h3>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <ProgressBar value={progress} />

      <p className="text-xs text-brand-muted mt-3">
        {completedDeliverables}/{totalDeliverables} deliverables completed
      </p>
    </PortalCard>
  );
}
