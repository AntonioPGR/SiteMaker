'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, UserPlus } from 'lucide-react';

interface HeaderProps {
  authenticated?: boolean;
}

export default function Header({ authenticated = false }: HeaderProps) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('authToken');
    router.push('/');
  }

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#050b33] px-5 py-4 text-white shadow-md sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/lab-maker-logo.png"
            alt="Lab Maker"
            width={180}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          <Link href="/" className="transition-colors hover:text-[#00ff9d]">Início</Link>
          <Link href="#materiais" className="transition-colors hover:text-[#00ff9d]">Materiais</Link>
          <Link href="#maquinas" className="transition-colors hover:text-[#00ff9d]">Máquinas</Link>
          <Link href="#pedidos" className="transition-colors hover:text-[#00ff9d]">Pedidos</Link>
          <Link href="#emprestimos" className="transition-colors hover:text-[#00ff9d]">Empréstimos</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex" aria-label="Cores do Lab Maker">
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff2a55]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#7000ff]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#00ff19]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff6a00]" />
          </div>
          {authenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              title="Sair"
              aria-label="Sair"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-xs font-bold transition-colors hover:bg-white/10 sm:px-4 sm:text-sm">
                <LogIn className="h-4 w-4" /> Entrar
              </Link>
              <Link href="/Cadastro" className="hidden items-center gap-2 rounded-full bg-[#00ff9d] px-4 py-2 text-sm font-bold text-[#050b33] transition-transform hover:-translate-y-0.5 sm:inline-flex">
                <UserPlus className="h-4 w-4" /> Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}