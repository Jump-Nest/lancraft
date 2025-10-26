import { AuthProvider } from '@/lib/auth-context';

export const metadata = {
  title: 'Administrace - LanCraft',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}