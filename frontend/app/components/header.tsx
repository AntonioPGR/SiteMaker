'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogIn, LogOut, User, UserPlus, Menu, X } from 'lucide-react';

interface HeaderProps {
  authenticated?: boolean;
  userName?: string;
  userId?: string;
}

export default function Header({ authenticated, userName, userId }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Verificadores de rota para realce visual
  const isInicio = pathname === '/';
  const isAgendamento = pathname === '/Agendamento-ADM';
  const isNormas = pathname === '/normas';

  useEffect(() => {
    // 1. Regista/recupera o ID do utilizador
    if (userId) {
      setCurrentUserId(userId);
      localStorage.setItem('userId', userId);
    } else {
      const storedId = localStorage.getItem('userId');
      if (storedId) setCurrentUserId(storedId);
    }

    // 2. Regista/recupera o Nome do utilizador
    if (userName) {
      setDisplayName(userName);
      setIsAuth(true);
      localStorage.setItem('userName', userName);
      return;
    }

    const storedName = localStorage.getItem('userName');
    const storedToken = localStorage.getItem('authToken');

    if (storedName) {
      setDisplayName(storedName);
      setIsAuth(true);
    } else if (authenticated || storedToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userName, userId, authenticated]);

  function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('authToken');
      localStorage.clear();
    }
    setIsAuth(false);
    setDisplayName('');
    setCurrentUserId('');
    router.push('/login');
  }

  const profileHref = currentUserId ? `/home/${currentUserId}` : '#';

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#050b33] px-5 py-4 text-white shadow-md sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        {/* GRUPO ESQUERDA: LOGO + NAVEGAÇÃO FIXOS */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-95">
            <Image
              src="/lab-maker-logo.png"
              alt="Lab Maker"
              width={180}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Links de Navegação Desktop */}
          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            <Link href="/" className="transition-colors hover:text-[#00ff9d]">Início</Link>
            <Link href="/#materiais" className="transition-colors hover:text-[#00ff9d]">Materiais</Link>
            <Link href="/#maquinas" className="transition-colors hover:text-[#00ff9d]">Máquinas</Link>
            <Link href="/#pedidos" className="transition-colors hover:text-[#00ff9d]">Pedidos</Link>
            <Link href="/#emprestimos" className="transition-colors hover:text-[#00ff9d]">Empréstimos</Link>
            <Link href="/normas" className="transition-colors hover:text-[#00ff9d]">Normas</Link>
          </nav>
        </div>

        {/* GRUPO DIREITA: CORES DO LAB MAKER E AÇÕES DO USUÁRIO */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden items-center gap-2 sm:flex" aria-label="Cores do Lab Maker">
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff2a55]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#7000ff]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#00ff19]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff6a00]" />
          </div>

          {isAuth ? (
            <div className="flex items-center gap-3">
              <Link
                href={profileHref}
                title="Ir para o meu perfil"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white transition-all hover:border-[#00ff9d] hover:bg-white/10"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7000ff] text-white">
                  <User className="h-3.5 w-3.5" />
                </div>
                {displayName && <span>{displayName}</span>}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                title="Sair"
                aria-label="Sair"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-xs font-bold transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
              >
                <LogIn className="h-4 w-4" /> Entrar
              </Link>
              <Link
                href="/Cadastro"
                className="hidden items-center gap-2 rounded-full bg-[#00ff9d] px-4 py-2 text-sm font-bold text-[#050b33] transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Criar conta
              </Link>
            </>
          )}

          {/* BOTÃO DO MENU MOBILE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
              isInicio ? 'bg-white/10 text-[#00ff9d]' : 'text-white/90 hover:bg-white/5'
            }`}
          >
            Início
          </Link>
          <Link
            href="/#materiais"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg font-semibold text-sm text-white/90 hover:bg-white/5 transition-colors"
          >
            Materiais
          </Link>
          <Link
            href="/#maquinas"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg font-semibold text-sm text-white/90 hover:bg-white/5 transition-colors"
          >
            Máquinas
          </Link>
          <Link
            href="/#pedidos"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg font-semibold text-sm text-white/90 hover:bg-white/5 transition-colors"
          >
            Pedidos
          </Link>
          <Link
            href="/#emprestimos"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg font-semibold text-sm text-white/90 hover:bg-white/5 transition-colors"
          >
            Empréstimos
          </Link>
          <Link
            href="/Agendamento-ADM"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-between transition-colors ${
              isAgendamento ? 'bg-white/10 text-[#00ff9d]' : 'text-white/90 hover:bg-white/5'
            }`}
          >
            <span>Agendamento</span>
            <span className="text-[10px] bg-[#7000ff] text-white px-2 py-0.5 rounded-full font-bold">ADM</span>
          </Link>
          <Link
            href="/normas"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
              isNormas ? 'bg-white/10 text-[#00ff9d]' : 'text-white/90 hover:bg-white/5'
            }`}
          >
            Normas
          </Link>
          {!isAuth && (
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2 sm:hidden">
              <Link
                href="/Cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#00ff9d] px-4 py-2.5 text-sm font-bold text-[#050b33]"
              >
                <UserPlus className="h-4 w-4" /> Criar conta
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}