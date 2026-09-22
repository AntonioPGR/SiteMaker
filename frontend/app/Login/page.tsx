'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Usuário ou senha inválidos');
            }

            const data = await response.json();

            // Exemplo: se o back-end retornar um token, você pode salvá-lo no localStorage
            // localStorage.setItem('token', data.token);

            // Redireciona para a página principal ou dashboard após o login
            router.push('/dashboard');
        } catch (err) {
            setErro('Erro ao realizar login. Verifique suas credenciais e se o back-end está rodando.');
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

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#FF2A55] inline-block"></span>
                        <span className="w-4 h-4 rounded-full bg-[#7000FF] inline-block"></span>
                        <span className="w-4 h-4 rounded-full bg-[#00FF19] inline-block"></span>
                        <span className="w-4 h-4 rounded-full bg-[#FF6A00] inline-block"></span>
                    </div>
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL (DIVIDIDO EM 2 COLUNAS) */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2">
                {/* LADO ESQUERDO: Imagem do Lab */}
                <div className="relative min-h-[300px] md:min-h-full bg-gray-800">
                    <Image
                        src="/fotita.jpeg"
                        alt="Instalações Lab Maker"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* LADO DIREITO: Formulário Branco */}
                <div className="bg-white p-8 md:p-12 flex flex-col items-center justify-center text-gray-800 relative">
                    <div className="w-full max-w-sm flex flex-col items-center gap-6">

                        {/* Logo do Lab Maker */}
                        <Image
                            src="/labmaker.png"
                            alt="Lab Maker"
                            width={240}
                            height={70}
                            className="h-18 w-auto object-contain mb-2"
                        />

                        {erro && (
                            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-xs text-center">
                                {erro}
                            </div>
                        )}

                        {/* Campos de Entrada */}
                        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                            {/* Campo USERNAME */}
                            <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-900">
                                <User className="w-5 h-5 text-gray-600 mr-3" />
                                <input
                                    type="text"
                                    placeholder="USERNAME"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full outline-none text-sm font-semibold text-gray-700 bg-transparent placeholder-gray-500"
                                />
                            </div>

                            {/* Campo PASSWORD */}
                            <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-900">
                                <Lock className="w-5 h-5 text-gray-600 mr-3" />
                                <input
                                    type="password"
                                    placeholder="PASSWORD"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full outline-none text-sm font-semibold text-gray-700 bg-transparent placeholder-gray-500"
                                />
                            </div>

                            {/* Botão LOGIN */}
                            <button
                                type="submit"
                                className="w-full border-2 border-[#050b33] text-[#050b33] font-bold py-2 rounded-md hover:bg-[#050b33] hover:text-white transition-colors uppercase tracking-wider text-sm mt-2"
                            >
                                LOGIN
                            </button>

                            {/* Botão REGISTRO */}
                            <Link
                                href="/Cadastro"
                                className="w-full border-2 border-[#050b33] text-[#050b33] font-bold py-2 rounded-md hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm text-center"
                            >
                                REGISTRO
                            </Link>
                        </form>

                        {/* Esqueceu a Senha */}
                        <a href="#" className="text-xs font-bold text-gray-800 hover:underline mt-2">
                            Esqueceu a senha?
                        </a>
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