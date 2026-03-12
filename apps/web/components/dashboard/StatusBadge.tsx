import clsx from 'clsx';

interface StatusBadgeProps {
  status:
    | 'draft'
    | 'pending'
    | 'sent'
    | 'accepted'
    | 'expired'
    | 'active'
    | 'rejected'
    | 'low'
    | 'medium'
    | 'high';
  children: React.ReactNode;
}

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={clsx('status-badge', {
        'status-draft': status === 'draft',
        'status-pending': status === 'pending',
        'status-sent': status === 'sent',
        'status-accepted': status === 'accepted',
        'status-expired': status === 'expired',
        'status-active': status === 'active',
        'status-rejected': status === 'rejected',
        'status-low': status === 'low',
        'status-medium': status === 'medium',
        'status-high': status === 'high',
      })}
    >
      {children}
    </span>
  );
}
