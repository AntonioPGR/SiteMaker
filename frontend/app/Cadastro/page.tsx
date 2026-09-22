'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Lock, Mail, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cpf, email, senha }),
            });

            if (!response.ok) {
                throw new Error('Não foi possível realizar o cadastro.');
            }

            setSucesso('Cadastro realizado com sucesso! Redirecionando...');
            setTimeout(() => {
                router.push('/Login');
            }, 2000);
        } catch (err) {
            setErro('Erro ao registar utilizador. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#050b33]">
            {/* HEADER / BARRA SUPERIOR */}
            <header className="px-8 py-4 flex items-center justify-between border-b border-white/10">
                <Link href="/">
                    <Image
                        src="/lab-maker-logo.png"
                        alt="Lab Maker"
                        width={180}
                        height={50}
                        className="h-18 w-auto object-contain"
                    />
                </Link>

                {/* Círculos coloridos e botões */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#FF2A55] inline-block"></span>
                        <span className="w-4 h-4 rounded-full bg-[#7000FF] inline-block"></span>
                        <span className="w-4 h-4 rounded-full bg-[#00FF19] inline-block"></span>
                        <span className="w-4 h-4 rounded-full bg-[#FF6A00] inline-block"></span>
                    </div>
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL (SPLIT 2 COLUNAS) */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2">

                {/* LADO ESQUERDO: Imagem do Lab */}
                <div className="relative min-h-[350px] md:min-h-full bg-gray-800">
                    <Image
                        src="/fotita.jpeg"
                        alt="Instalações Lab Maker"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* LADO DIREITO: Formulário de Registro */}
                <div className="bg-white p-8 md:p-12 flex flex-col justify-between items-center relative overflow-hidden">

                    <div className="w-full max-w-sm flex flex-col items-center gap-4 my-auto z-10">
                        {/* Logo Central */}
                        <Image
                            src="/labmaker.png"
                            alt="Lab Maker"
                            width={220}
                            height={60}
                            className="h-14 w-auto object-contain mb-2"
                        />

                        {erro && (
                            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs text-center">
                                {erro}
                            </div>
                        )}

                        {sucesso && (
                            <div className="w-full bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded text-xs text-center">
                                {sucesso}
                            </div>
                        )}

                        {/* FORMULÁRIO DE CADASTRO */}
                        <form onSubmit={handleRegister} className="w-full flex flex-col gap-3.5">

                            {/* Campo NOME COMPLETO */}
                            <div className="flex items-center border-2 border-gray-400 rounded-md overflow-hidden bg-white shadow-sm focus-within:border-[#050b33]">
                                <div className="p-2.5 border-r border-gray-300 bg-gray-50">
                                    <User className="w-5 h-5 text-gray-600" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="NOME COMPLETO"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 outline-none text-sm font-semibold text-gray-800 placeholder-gray-500 bg-transparent"
                                />
                            </div>

                            {/* Campo CPF */}
                            <div className="flex items-center border-2 border-gray-400 rounded-md overflow-hidden bg-white shadow-sm focus-within:border-[#050b33]">
                                <div className="p-2.5 border-r border-gray-300 bg-gray-50">
                                    <CreditCard className="w-5 h-5 text-gray-600" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="CPF"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 outline-none text-sm font-semibold text-gray-800 placeholder-gray-500 bg-transparent"
                                />
                            </div>

                            {/* Campo EMAIL */}
                            <div className="flex items-center border-2 border-gray-400 rounded-md overflow-hidden bg-white shadow-sm focus-within:border-[#050b33]">
                                <div className="p-2.5 border-r border-gray-300 bg-gray-50">
                                    <Mail className="w-5 h-5 text-gray-600" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="EMAIL"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 outline-none text-sm font-semibold text-gray-800 placeholder-gray-500 bg-transparent"
                                />
                            </div>

                            {/* Campo SENHA */}
                            <div className="flex items-center border-2 border-gray-400 rounded-md overflow-hidden bg-white shadow-sm focus-within:border-[#050b33]">
                                <div className="p-2.5 border-r border-gray-300 bg-gray-50">
                                    <Lock className="w-5 h-5 text-gray-600" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="SENHA"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 outline-none text-sm font-semibold text-gray-800 placeholder-gray-500 bg-transparent"
                                />
                            </div>

                            {/* Botão REGISTRO */}
                            <button
                                type="submit"
                                className="w-full mt-2 border-2 border-[#050b33] text-[#050b33] font-extrabold py-2.5 rounded-md hover:bg-[#050b33] hover:text-white transition-all uppercase tracking-wider text-sm shadow-sm"
                            >
                                REGISTRO
                            </button>

                            {/* Link para voltar ao Login */}
                            <div className="text-center mt-2">
                                <span className="text-xs text-gray-600">Já possui uma conta? </span>
                                <Link href="/Login" className="text-xs font-bold text-[#050b33] hover:underline">
                                    Faça Login
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* RODAPÉ DO LADO DIREITO: Texto "Como posso ajudar?" */}
                    <div className="w-full flex flex-col items-end z-10 mt-6">
            <span className="text-xs font-bold text-[#050b33] cursor-pointer hover:underline mb-4">
              Como posso ajudar?
            </span>
                    </div>

                    {/* Onda Decorativa com Bolinhas na parte inferior */}
                    <div className="absolute bottom-0 right-0 left-0 w-full pointer-events-none">
                        <svg viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path d="M0,20 Q120,75 250,50 T500,40" stroke="#050b33" strokeWidth="1.5" fill="none" />
                            <circle cx="50" cy="38" r="7" fill="#8B5CF6" />
                            <circle cx="250" cy="50" r="7" fill="#10B981" />
                            <circle cx="450" cy="37" r="7" fill="#FF0055" />
                        </svg>
                    </div>

                </div>
            </main>
        </div>
    );
}