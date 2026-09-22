import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full px-8 py-4 flex items-center justify-between bg-[#050b33] border-b border-white/10">
            {/* Logo Lab Maker */}
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/lab-maker-logo.png"
                    alt="Lab Maker"
                    width={180}
                    height={50}
                    className="h-10 w-auto object-contain"
                />
            </Link>

            {/* Links de Navegação */}
            <nav className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
                <Link href="/" className="hover:text-blue-300 transition-colors">Início</Link>
                <Link href="/materiais" className="hover:text-blue-300 transition-colors">Materiais</Link>
                <Link href="/maquinas" className="hover:text-blue-300 transition-colors">Máquinas</Link>
                <Link href="/pedidos" className="hover:text-blue-300 transition-colors">Pedidos</Link>
                <Link href="/emprestimos" className="hover:text-blue-300 transition-colors">Empréstimos</Link>
            </nav>

            {/* Lado Direito do Header (Bolinhas coloridas + Ícone do Usuário) */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-pink-500"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-purple-600"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-orange-500"></span>
                </div>

                <div className="flex items-center gap-1 text-white cursor-pointer pl-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/70" />
                </div>
            </div>
        </header>
    );
}