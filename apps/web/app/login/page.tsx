import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Employee Login',
  description: 'Employee portal login for West Central Contracting team members.',
};

export default function LoginPage() {
  return <LoginClient />;
}
