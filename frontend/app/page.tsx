'use client';

import { useEffect, useState } from 'react';

interface MensagemResponse {
  id: number;
  texto: string;
}

export default function Home() {
  const [mensagem, setMensagem] = useState<string>('Carregando...');

  useEffect(() => {
    fetch('http://localhost:8081/api/hello')
      .then((res) => res.json())
      .then((data: MensagemResponse) => setMensagem(data.texto))
      .catch(() => setMensagem('Erro ao conectar com o back-end'));
  }, []);

  return (
    <main className="p-8">
    <h1 className="text-4xl font-bold">{mensagem}</h1>
      </main>
  );
}