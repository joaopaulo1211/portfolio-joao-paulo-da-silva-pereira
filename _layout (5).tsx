import React, { useState, useEffect } from 'react';
import { QrCode, LogOut, User as UserIcon } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Header Minimalista */}
      <header className="w-full py-6 px-8 flex justify-between items-center bg-[linear-gradient(135deg,rgb(0,0,0)_0%,rgb(13,148,136)_100%)] border-b border-white/10 sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-2">
          <QrCode size={32} className="text-teal-500" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">
            QRCODE <span className="text-xs font-light opacity-70">CHANGE</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-5">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-white text-sm font-bold">{user.displayName || 'Usuário'}</span>
                <span className="text-white/50 text-[10px] uppercase tracking-widest">Premium</span>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-teal-500/50" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/50">
                  <UserIcon size={20} className="text-teal-500" />
                </div>
              )}
              <button 
                onClick={handleSignOut}
                className="p-2 text-white/50 hover:text-red-400 transition-colors"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={openLogin}
                className="hidden sm:block text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Entrar
              </button>
              <button 
                onClick={openSignup}
                className="bg-white text-black hover:bg-teal-500 hover:text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg active:scale-95"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {children}
        </div>
      </main>

      <footer className="py-12 text-center text-xs text-white/50 font-medium bg-[linear-gradient(135deg,rgb(0,0,0)_0%,rgb(13,148,136)_100%)] border-t border-white/10">
        © 2026 QRCODE CHANGE • Professional Tool
      </footer>
    </div>
  );
};
