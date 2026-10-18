'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Home,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  ShieldCheck,
  ChevronDown,
  FileText,
  Table,
  UserCheck
} from 'lucide-react';
import Header from '@/app/components/header';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- TIPAGENS E DADOS DE MÁQUINAS ---
export type MachineStatus = 'Em operação' | 'Disponível' | 'Inativo';
export type MachineType = 'Impressão 3D' | 'Corte a Laser' | 'CNC';

export interface Machine {
  id: string;
  code: string;
  name: string;
  description: string;
  type: MachineType;
  status: MachineStatus;
  image: string;
}

const INITIAL_MACHINES: Machine[] = [
  { id: '1', code: '#M001', name: 'Impressão 3D', description: 'Impressora 3D FDM para prototipagem.', type: 'Impressão 3D', status: 'Em operação', image: '/machines/m1.png' },
  { id: '2', code: '#M002', name: 'Corte a Laser', description: 'Máquina de corte e gravação a laser.', type: 'Corte a Laser', status: 'Disponível', image: '/machines/m2.png' },
  { id: '3', code: '#M003', name: 'Creality CR200B', description: 'Impressora 3D de alta precisão.', type: 'Impressão 3D', status: 'Disponível', image: '/machines/m3.png' },
  { id: '4', code: '#M004', name: 'GTMAX3D Core H5', description: 'Impressora 3D industrial.', type: 'Impressão 3D', status: 'Disponível', image: '/machines/m4.png' },
  { id: '5', code: '#M005', name: 'Creality Ender 3 Pro', description: 'Impressora versátil.', type: 'Impressão 3D', status: 'Em operação', image: '/machines/m5.png' },
  { id: '6', code: '#M006', name: 'GTMAX3D Core A3v2', description: 'Impressora de alta performance.', type: 'Impressão 3D', status: 'Disponível', image: '/machines/m6.png' },
  { id: '7', code: '#M007', name: 'Delta CNC', description: 'Router CNC para usinagem.', type: 'CNC', status: 'Inativo', image: '/machines/m7.png' },
];

// --- TIPAGENS E DADOS DE USUÁRIOS ---
export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  type: 'ALUNO' | 'PROFESSOR' | 'FUNCIONARIO' | 'VISITANTE';
  profile: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  birthDate: string;
  createdAt: string;
}

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Ian Santos', email: 'ian@123', cpf: '40028922', phone: '+5535992202021', type: 'ALUNO', profile: 'USER', status: 'ACTIVE', birthDate: '2026-10-18', createdAt: '18/10/2026, 19:48:13' },
  { id: '2', name: 'Maria Oliveira', email: 'maria.oli@email.com', cpf: '12345678901', phone: '+5535988887777', type: 'PROFESSOR', profile: 'ADMIN', status: 'ACTIVE', birthDate: '1985-04-12', createdAt: '10/09/2026, 14:22:00' },
  { id: '3', name: 'João Silva', email: 'joao.silva@email.com', cpf: '98765432100', phone: '+5535977776666', type: 'ALUNO', profile: 'USER', status: 'INACTIVE', birthDate: '2001-08-25', createdAt: '12/09/2026, 09:15:30' },
  { id: '4', name: 'Ana Costa', email: 'ana.costa@email.com', cpf: '45612378900', phone: '+5535966665555', type: 'ALUNO', profile: 'USER', status: 'ACTIVE', birthDate: '1999-11-03', createdAt: '15/09/2026, 11:40:12' },
  { id: '5', name: 'Carlos Santos', email: 'carlos.s@email.com', cpf: '32165498700', phone: '+5535955554444', type: 'FUNCIONARIO', profile: 'ADMIN', status: 'ACTIVE', birthDate: '1990-02-18', createdAt: '20/09/2026, 16:05:45' },
  { id: '6', name: 'Beatriz Lima', email: 'bia.lima@email.com', cpf: '15975345600', phone: '+5535944443333', type: 'ALUNO', profile: 'USER', status: 'ACTIVE', birthDate: '2003-07-30', createdAt: '01/10/2026, 10:20:10' },
  { id: '7', name: 'Pedro Alves', email: 'pedro.alves@email.com', cpf: '75315985200', phone: '+5535933332222', type: 'VISITANTE', profile: 'USER', status: 'INACTIVE', birthDate: '1995-12-05', createdAt: '05/10/2026, 13:50:22' },
  { id: '8', name: 'Fernanda Gomes', email: 'fernanda.g@email.com', cpf: '85296374100', phone: '+5535922221111', type: 'PROFESSOR', profile: 'USER', status: 'ACTIVE', birthDate: '1982-09-14', createdAt: '08/10/2026, 08:30:05' },
  { id: '9', name: 'Lucas Martins', email: 'lucas.m@email.com', cpf: '36925814700', phone: '+5535911110000', type: 'ALUNO', profile: 'USER', status: 'ACTIVE', birthDate: '2000-05-22', createdAt: '12/10/2026, 15:10:40' },
  { id: '10', name: 'Juliana Rocha', email: 'ju.rocha@email.com', cpf: '14725836900', phone: '+5535900009999', type: 'ALUNO', profile: 'USER', status: 'ACTIVE', birthDate: '2002-01-10', createdAt: '16/10/2026, 18:00:00' },
];

export default function RelatoriosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- RELATÓRIO DE MÁQUINAS (PDF) ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const logo = new window.Image();
    logo.src = '/labmaker.png';
    
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 14, 12, 45, 13);
      doc.setFontSize(20);
      doc.setTextColor(5, 11, 51);
      doc.text('Relatório de Status das Máquinas', 14, 38);
      
      doc.setFontSize(10);
      doc.setTextColor(86, 97, 125);
      doc.text(`Documento gerado em ${dataAtual} às ${horaAtual}`, 14, 45);

      const tableColumn = ["CÓDIGO", "MÁQUINA", "TIPO", "STATUS"];
      const tableRows = INITIAL_MACHINES.map(machine => [
        machine.code,
        machine.name,
        machine.type,
        machine.status
      ]);

      autoTable(doc, {
        startY: 52,
        head: [tableColumn],
        body: tableRows,
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 5, lineColor: [223, 228, 238], lineWidth: 0.1 },
        headStyles: { fillColor: [5, 11, 51], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 251] },
        didDrawPage: function (data) {
          const str = 'Página ' + doc.getCurrentPageInfo().pageNumber;
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
          doc.text('Lab Maker - Laboratório de Fabricação Digital PUC Minas', 120, pageHeight - 10);
        }
      });

      doc.save(`LabMaker_Maquinas_${dataAtual.replace(/\//g, '-')}.pdf`);
    };
  };

  // --- RELATÓRIO DE MÁQUINAS (CSV) ---
  const handleExportCSV = () => {
    const headers = ['Código', 'Máquina', 'Descrição', 'Tipo', 'Status'];
    const rows = INITIAL_MACHINES.map(m => [`"${m.code}"`, `"${m.name}"`, `"${m.description}"`, `"${m.type}"`, `"${m.status}"`]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'LabMaker_Maquinas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RELATÓRIO DE USUÁRIOS (PDF) ---
  const handleExportUsersPDF = () => {
    const doc = new jsPDF('landscape');
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const logo = new window.Image();
    logo.src = '/labmaker.png';
    
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 14, 12, 45, 13);
      
      doc.setFontSize(20);
      doc.setTextColor(5, 11, 51);
      doc.text('Relatório de Usuários Cadastrados', 14, 38);
      
      doc.setFontSize(10);
      doc.setTextColor(86, 97, 125);
      doc.text(`Documento gerado em ${dataAtual} às ${horaAtual}`, 14, 45);

      const tableColumn = ["NOME", "E-MAIL", "CPF", "CELULAR", "TIPO", "PERFIL", "STATUS"];
      const tableRows = INITIAL_USERS.map(user => [
        user.name,
        user.email,
        user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"), 
        user.phone,
        user.type,
        user.profile,
        user.status === 'ACTIVE' ? 'Ativo' : 'Inativo'
      ]);

      autoTable(doc, {
        startY: 52,
        head: [tableColumn],
        body: tableRows,
        styles: { font: 'helvetica', fontSize: 9, cellPadding: 5, lineColor: [223, 228, 238], lineWidth: 0.1 },
        headStyles: { fillColor: [5, 11, 51], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 251] },
        didDrawPage: function (data) {
          const str = 'Página ' + doc.getCurrentPageInfo().pageNumber;
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
          doc.text('Lab Maker - Laboratório de Fabricação Digital PUC Minas', 210, pageHeight - 10);
        }
      });

      doc.save(`LabMaker_Usuarios_${dataAtual.replace(/\//g, '-')}.pdf`);
    };
  };

  // --- RELATÓRIO DE USUÁRIOS (CSV) ---
  const handleExportUsersCSV = () => {
    const headers = ['Nome', 'E-mail', 'CPF', 'Celular', 'Tipo', 'Perfil', 'Status', 'Data de Nascimento', 'Criado em'];
    
    const rows = INITIAL_USERS.map(user => [
      `"${user.name}"`,
      `"${user.email}"`,
      `"${user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}"`, 
      `"${user.phone}"`,
      `"${user.type}"`,
      `"${user.profile}"`,
      `"${user.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}"`,
      `"${user.birthDate}"`,
      `"${user.createdAt}"`
    ]);
    
    const csvContent = [
      headers.join(','), 
      ...rows.map(r => r.join(','))
    ].join('\n');
    
    // O '\uFEFF' força o CSV a ser reconhecido como UTF-8, garantindo que acentos funcionem no Excel
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'LabMaker_Usuarios.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#050b33] flex flex-col font-sans selection:bg-[#7000ff]/20 selection:text-[#050b33]">
      <Header authenticated />

      <div className="bg-[#030722] border-b border-white/10 px-4 sm:px-8 py-2.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? 'Recolher menu lateral' : 'Expandir menu lateral'}
              className="hidden lg:inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              <span className="text-[11px] font-medium">{sidebarOpen ? 'Recolher' : 'Menu'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="text-[11px] font-medium">Menu</span>
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7000ff]/30 px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase text-[#00ff9d] border border-[#7000ff]/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00ff9d]" /> Painel Administrativo
            </span>
            <span className="hidden sm:inline text-white/30">/</span>
            <span className="hidden sm:inline text-white/80 font-medium">Laboratório de Fabricação Digital</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              title="Notificações"
              className="relative p-1 text-white/70 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff2a55] text-[9px] font-extrabold text-white">
                1
              </span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <div className="w-7 h-7 rounded-full bg-[#7000ff] flex items-center justify-center font-bold text-white text-xs shadow-inner">
                M
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="font-semibold text-white text-xs">Monitor</p>
                <p className="text-[10px] text-white/60">Administrador</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <aside
          className={`bg-[#050b33] text-white shrink-0 border-r border-white/10 transition-all duration-300 relative flex flex-col justify-between ${
            sidebarOpen ? 'w-60' : 'w-16'
          } ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 w-64 shadow-2xl flex' : 'hidden lg:flex'}`}
        >
          <div className="absolute bottom-16 -left-10 w-44 h-44 opacity-5 pointer-events-none text-white">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 35a15 15 0 1 0 0 30 15 15 0 0 0 0-30zm0-25c-2.3 0-4.3 1.5-4.8 3.8l-1.3 5.4c-2.4.7-4.7 1.8-6.7 3.1l-5-2.6c-2.1-1.1-4.7-.6-6.2 1.2l-5.7 7c-1.5 1.8-1.5 4.4-.1 6.3l3.3 4.6c-1.2 2.1-2.1 4.4-2.7 6.9l-5.5 1.1C13.2 47.3 11.5 49.3 11.5 51.6v9c0 2.3 1.7 4.3 3.9 4.8l5.5 1.1c.6 2.5 1.5 4.8 2.7 6.9l-3.3 4.6c-1.4 1.9-1.4 4.5-.1 6.3l-5.7-7c-1.5-1.8-4.1-2.3-6.2-1.2l-5 2.6c-2-1.3-4.3-2.4-6.7-3.1l-1.3-5.4C58.3 11.5 56.3 10 54 10h-4z" />
            </svg>
          </div>

          <div className="p-3.5 space-y-1 relative z-10">
            {mobileMenuOpen && (
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 lg:hidden">
                <span className="font-bold text-sm tracking-wide text-[#00ff9d]">NAVEGAÇÃO ADM</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            <SidebarItem icon={<Home className="w-5 h-5" />} label="Início" href="/" collapsed={!sidebarOpen} />
            <SidebarItem icon={<Wrench className="w-5 h-5" />} label="Máquinas" href="/Maquinas-ADM" collapsed={!sidebarOpen} />
            <SidebarItem icon={<Calendar className="w-5 h-5" />} label="Agendamentos" href="/Agendamento-ADM" collapsed={!sidebarOpen} />
            <SidebarItem icon={<Users className="w-5 h-5" />} label="Usuários" href="#usuarios" collapsed={!sidebarOpen} />
            <SidebarItem icon={<BarChart3 className="w-5 h-5" />} label="Relatórios" href="/Relatorio-ADM" active collapsed={!sidebarOpen} />
            <SidebarItem icon={<Settings className="w-5 h-5" />} label="Configurações" href="#configuracoes" collapsed={!sidebarOpen} />
          </div>

          <div className="p-3.5 border-t border-white/10 relative z-10 bg-[#050b33]">
            <SidebarItem icon={<LogOut className="w-5 h-5" />} label="Sair" href="/" collapsed={!sidebarOpen} />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-10 py-7 max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#dfe4ee] shadow-sm max-w-2xl w-full text-center">
            <h1 className="text-2xl font-extrabold text-[#050b33] mb-2 tracking-tight">
              Exportação de Relatórios
            </h1>
            <p className="text-sm text-[#56617d] mb-10 font-medium">
              Escolha o módulo e o formato desejado para exportar os dados do laboratório.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* COLUNA MÁQUINAS */}
              <div className="flex flex-col gap-4 border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-8">
                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm mb-2">
                  <Wrench className="w-4 h-4" />
                  <h3>MÁQUINAS</h3>
                </div>
                
                <button
                  onClick={handleExportPDF}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#050b33] px-5 py-4 text-sm font-extrabold text-white transition-all hover:bg-[#101d5e] hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5" />
                  RELATÓRIO PDF
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10b981] px-5 py-4 text-sm font-extrabold text-white shadow-sm shadow-emerald-500/20 transition-all hover:bg-[#059669] hover:-translate-y-0.5"
                >
                  <Table className="w-5 h-5" />
                  RELATÓRIO CSV
                </button>
              </div>

              {/* COLUNA USUÁRIOS */}
              <div className="flex flex-col gap-4 md:pl-4">
                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm mb-2">
                  <Users className="w-4 h-4" />
                  <h3>USUÁRIOS</h3>
                </div>

                <button
                  onClick={handleExportUsersPDF}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7000ff] px-5 py-4 text-sm font-extrabold text-white shadow-sm shadow-[#7000ff]/20 transition-all hover:bg-[#5a00cc] hover:-translate-y-0.5"
                >
                  <UserCheck className="w-5 h-5" />
                  RELATÓRIO PDF
                </button>

                <button
                  onClick={handleExportUsersCSV}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-5 py-4 text-sm font-extrabold text-white shadow-sm shadow-sky-500/20 transition-all hover:bg-[#0284c7] hover:-translate-y-0.5"
                >
                  <Table className="w-5 h-5" />
                  RELATÓRIO CSV
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active = false,
  collapsed = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-[#101b4c] text-[#f59e0b] shadow-inner'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <span className={active ? 'text-[#f59e0b]' : 'text-white/70'}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
