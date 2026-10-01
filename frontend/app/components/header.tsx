'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogIn, LogOut, UserPlus, Menu, X } from 'lucide-react';

interface HeaderProps {
  authenticated?: boolean;
}

export default function Header({ authenticated = false }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('authToken');
    router.push('/');
  }

  const isAgendamento = pathname === '/Agendamento-ADM';
  const isNormas = pathname === '/normas';
  const isInicio = pathname === '/';

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#050b33] px-5 py-4 text-white shadow-md sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        {/* GRUPO ESQUERDA: LOGO + NAVEGAÇÃO FIXOS (PADRÃO CONSISTENTE EM TODAS AS PÁGINAS) */}
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

          {/* NAVEGAÇÃO DESKTOP ALINHADA À ESQUERDA JUNTO À LOGO */}
          <nav className="hidden items-center gap-4 xl:gap-6 text-sm font-semibold lg:flex shrink-0">
            <Link
              href="/"
              className={`transition-colors hover:text-[#00ff9d] ${
                isInicio ? 'text-[#00ff9d]' : 'text-white/90'
              }`}
            >
              Início
            </Link>
            <Link
              href="/#materiais"
              className="transition-colors hover:text-[#00ff9d] text-white/90"
            >
              Materiais
            </Link>
            <Link
              href="/#maquinas"
              className="transition-colors hover:text-[#00ff9d] text-white/90"
            >
              Máquinas
            </Link>
            <Link
              href="/#pedidos"
              className="transition-colors hover:text-[#00ff9d] text-white/90"
            >
              Pedidos
            </Link>
            <Link
              href="/#emprestimos"
              className="transition-colors hover:text-[#00ff9d] text-white/90"
            >
              Empréstimos
            </Link>
            <Link
              href="/Agendamento-ADM"
              className={`transition-colors hover:text-[#00ff9d] ${
                isAgendamento ? 'text-[#00ff9d]' : 'text-white/90'
              }`}
            >
              Agendamento
            </Link>
            <Link
              href="/normas"
              className={`transition-colors hover:text-[#00ff9d] ${
                isNormas ? 'text-[#00ff9d]' : 'text-white/90'
              }`}
            >
              Normas
            </Link>
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
          {!authenticated && (
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