import { ReactNode } from 'react';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant: 'primary' | 'success' | 'danger' | 'warning';
  subtitle?: string;
  className?: string;
}

const variantStyles = {
  primary: {
    card: 'stat-card-primary',
    icon: 'bg-primary/10 text-primary',
    value: 'text-foreground',
  },
  success: {
    card: 'stat-card-success',
    icon: 'bg-success/10 text-success',
    value: 'text-success',
  },
  danger: {
    card: 'stat-card-danger',
    icon: 'bg-danger/10 text-danger',
    value: 'text-danger',
  },
  warning: {
    card: 'stat-card-warning',
    icon: 'bg-warning/10 text-warning',
    value: 'text-warning',
  },
};

export function StatCard({ title, value, icon, variant, subtitle, className }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn('stat-card animate-slide-up', styles.card, className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn('text-2xl md:text-3xl font-bold font-display tracking-tight', styles.value)}>
            {formatCurrency(value)}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', styles.icon)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
