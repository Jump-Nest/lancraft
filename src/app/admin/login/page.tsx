'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  // Pokud je už přihlášený, přesměruj na dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Nesprávné heslo. Zkuste znovu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-lg p-6 sm:p-8 border border-zinc-800">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-montserrat">Administrace</h1>
          <p className="text-zinc-400 mb-6 text-sm sm:text-base">LanCraft - Správa projektů</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-white mb-2">
                Heslo
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadejte heslo"
                className="w-full px-3 sm:px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded px-3 sm:px-4 py-3 text-red-300 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-200 text-black font-bold py-2 px-4 rounded transition-colors text-sm"
            >
              {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}