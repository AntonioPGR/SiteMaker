'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wrench,
  Home,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Power,
  Radio,
  MinusCircle,
  Cpu,
  Bell,
  ShieldCheck,
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import Header from '@/app/components/header';


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
  {
    id: '1',
    code: '#M001',
    name: 'Impressão 3D',
    description: 'Impressora 3D FDM para prototipagem e projetos diversos.',
    type: 'Impressão 3D',
    status: 'Em operação',
    image: '/machines/m1.png',
  },
  {
    id: '2',
    code: '#M002',
    name: 'Corte a Laser',
    description: 'Máquina de corte e gravação a laser para materiais diversos.',
    type: 'Corte a Laser',
    status: 'Disponível',
    image: '/machines/m2.png',
  },
  {
    id: '3',
    code: '#M003',
    name: 'Creality CR200B',
    description: 'Impressora 3D de alta precisão com grande volume de impressão.',
    type: 'Impressão 3D',
    status: 'Disponível',
    image: '/machines/m3.png',
  },
  {
    id: '4',
    code: '#M004',
    name: 'GTMAX3D Core H5',
    description: 'Impressora 3D industrial para peças de maior resistência.',
    type: 'Impressão 3D',
    status: 'Disponível',
    image: '/machines/m4.png',
  },
  {
    id: '5',
    code: '#M005',
    name: 'Creality Ender 3 Pro',
    description: 'Impressora 3D versátil e de fácil manutenção.',
    type: 'Impressão 3D',
    status: 'Em operação',
    image: '/machines/m5.png',
  },
  {
    id: '6',
    code: '#M006',
    name: 'GTMAX3D Core A3v2',
    description: 'Impressora 3D de alta performance com dupla extrusão.',
    type: 'Impressão 3D',
    status: 'Disponível',
    image: '/machines/m6.png',
  },
  {
    id: '7',
    code: '#M007',
    name: 'Delta CNC',
    description: 'Router CNC para usinagem de materiais como madeira, acrílico e MDF.',
    type: 'CNC',
    status: 'Inativo',
    image: '/machines/m7.png',
  },
];

export default function MaquinasAdmPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredMachines = useMemo(() => {
    return INITIAL_MACHINES.filter((machine) => {
      const matchesSearch =
        machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'Todos' || machine.status === statusFilter;

      const matchesType =
        typeFilter === 'Todos' || machine.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const totalCount = INITIAL_MACHINES.length;
  const inOperationCount = INITIAL_MACHINES.filter((m) => m.status === 'Em operação').length;
  const availableCount = INITIAL_MACHINES.filter((m) => m.status === 'Disponível').length;
  const inactiveCount = INITIAL_MACHINES.filter((m) => m.status === 'Inativo').length;

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
          <div className="absolute -bottom-10 -left-10 w-44 h-44 opacity-5 pointer-events-none text-white">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 35a15 15 0 1 0 0 30 15 15 0 0 0 0-30zm0-25c-2.3 0-4.3 1.5-4.8 3.8l-1.3 5.4c-2.4.7-4.7 1.8-6.7 3.1l-5-2.6c-2.1-1.1-4.7-.6-6.2 1.2l-5.7 7c-1.5 1.8-1.5 4.4-.1 6.3l3.3 4.6c-1.2 2.1-2.1 4.4-2.7 6.9l-5.5 1.1C13.2 47.3 11.5 49.3 11.5 51.6v9c0 2.3 1.7 4.3 3.9 4.8l5.5 1.1c.6 2.5 1.5 4.8 2.7 6.9l-3.3 4.6c-1.4 1.9-1.4 4.5.1 6.3l5.7 7c1.5 1.8 4.1 2.3 6.2 1.2l5-2.6c2 1.3 4.3 2.4 6.7 3.1l1.3 5.4c.5 2.3 2.5 3.8 4.8 3.8h9c2.3 0 4.3-1.5 4.8-3.8l1.3-5.4c2.4-.7 4.7-1.8 6.7-3.1l5 2.6c2.1 1.1 4.7.6 6.2-1.2l5.7-7c1.5-1.8 1.5-4.4.1-6.3l-3.3-4.6c1.2-2.1 2.1-4.4 2.7-6.9l5.5-1.1c2.2-.5 3.9-2.5 3.9-4.8v-9c0-2.3-1.7-4.3-3.9-4.8l-5.5-1.1c-.6-2.5-1.5-4.8-2.7-6.9l3.3-4.6c1.4-1.9 1.4-4.5-.1-6.3l-5.7-7c-1.5-1.8-4.1-2.3-6.2-1.2l-5 2.6c-2-1.3-4.3-2.4-6.7-3.1l-1.3-5.4C58.3 11.5 56.3 10 54 10h-4z" />
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

            <SidebarItem
              icon={<Home className="w-5 h-5" />}
              label="Início"
              href="/"
              collapsed={!sidebarOpen}
            />

            <SidebarItem
              icon={<Wrench className="w-5 h-5" />}
              label="Máquinas"
              href="/Maquinas-ADM"
              active
              collapsed={!sidebarOpen}
            />

            <SidebarItem
              icon={<Calendar className="w-5 h-5" />}
              label="Agendamentos"
              href="#agendamentos"
              collapsed={!sidebarOpen}
            />

            <SidebarItem
              icon={<Users className="w-5 h-5" />}
              label="Usuários"
              href="#usuarios"
              collapsed={!sidebarOpen}
            />

            <SidebarItem
              icon={<BarChart3 className="w-5 h-5" />}
              label="Relatórios"
              href="#relatorios"
              collapsed={!sidebarOpen}
            />

            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Configurações"
              href="#configuracoes"
              collapsed={!sidebarOpen}
            />
          </div>

          <div className="p-3.5 border-t border-white/10 relative z-10">
            <SidebarItem
              icon={<LogOut className="w-5 h-5" />}
              label="Sair"
              href="/"
              collapsed={!sidebarOpen}
            />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-10 py-7 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7000ff] mb-1">
                PAINEL ADMINISTRATIVO
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#050b33] tracking-tight">
                Gerenciamento de Máquinas
              </h1>
              <p className="text-sm text-[#56617d] mt-1 font-medium">
                Cadastre, edite e acompanhe o status das máquinas do laboratório.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f59e0b] px-5 py-3 text-sm font-extrabold text-[#050b33] shadow-sm shadow-[#f59e0b]/30 transition-all hover:bg-[#eab308] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Adicionar Máquina</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <SummaryCard
              icon={
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10b981] text-white shadow-sm shadow-emerald-500/20">
                  <Power className="w-6 h-6 stroke-[2.5]" />
                </div>
              }
              title="Em operação"
              value={inOperationCount}
              onClick={() => setStatusFilter(statusFilter === 'Em operação' ? 'Todos' : 'Em operação')}
              isSelected={statusFilter === 'Em operação'}
            />

            <SummaryCard
              icon={
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-sm shadow-blue-500/20">
                  <Radio className="w-6 h-6 stroke-[2.5]" />
                </div>
              }
              title="Disponíveis"
              value={availableCount}
              onClick={() => setStatusFilter(statusFilter === 'Disponível' ? 'Todos' : 'Disponível')}
              isSelected={statusFilter === 'Disponível'}
            />

            <SummaryCard
              icon={
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#475569] text-white shadow-sm shadow-slate-500/20">
                  <MinusCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
              }
              title="Inativas"
              value={inactiveCount}
              onClick={() => setStatusFilter(statusFilter === 'Inativo' ? 'Todos' : 'Inativo')}
              isSelected={statusFilter === 'Inativo'}
            />

            <SummaryCard
              icon={
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#050b33] text-white shadow-sm shadow-[#050b33]/20">
                  <Cpu className="w-6 h-6 stroke-[2.5]" />
                </div>
              }
              title="Total de máquinas"
              value={totalCount}
              onClick={() => {
                setStatusFilter('Todos');
                setTypeFilter('Todos');
                setSearchTerm('');
              }}
              isSelected={statusFilter === 'Todos' && typeFilter === 'Todos' && !searchTerm}
            />
          </div>

          <div className="bg-white rounded-2xl border border-[#dfe4ee] p-3 sm:p-4 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome ou descrição..."
                className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-10 pr-4 py-2.5 text-sm text-[#050b33] placeholder-slate-400 transition-colors focus:bg-white focus:border-[#7000ff] focus:outline-none focus:ring-2 focus:ring-[#7000ff]/20"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="w-full md:w-48 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-8 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 focus:border-[#7000ff] focus:outline-none focus:ring-2 focus:ring-[#7000ff]/20 cursor-pointer"
              >
                <option value="Todos">Todos os status</option>
                <option value="Em operação">Em operação</option>
                <option value="Disponível">Disponível</option>
                <option value="Inativo">Inativo</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            <div className="w-full md:w-44 relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-8 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 focus:border-[#7000ff] focus:outline-none focus:ring-2 focus:ring-[#7000ff]/20 cursor-pointer"
              >
                <option value="Todos">Todos os tipos</option>
                <option value="Impressão 3D">Impressão 3D</option>
                <option value="Corte a Laser">Corte a Laser</option>
                <option value="CNC">CNC</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            <button
              type="button"
              title="Filtrar"
              className="w-full md:w-auto inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#7000ff] hover:border-[#7000ff]/50 hover:bg-[#7000ff]/5 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#dfe4ee] shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#fafbfe] text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">Máquina</th>
                    <th className="py-4 px-6">Descrição</th>
                    <th className="py-4 px-6 text-center">Tipo</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMachines.length > 0 ? (
                    filteredMachines.map((machine) => (
                      <tr
                        key={machine.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-14 h-11 rounded-lg overflow-hidden border border-slate-200/80 bg-slate-100 shrink-0 shadow-2xs group-hover:border-slate-300 transition-colors">
                              <Image
                                src={machine.image}
                                alt={machine.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#050b33] leading-snug">
                                {machine.name}
                              </p>
                              <span className="inline-block text-[11px] font-mono font-medium text-slate-400">
                                {machine.code}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 max-w-xs md:max-w-sm">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {machine.description}
                          </p>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#eef1ff] text-[#4f46e5] border border-[#e0e7ff]">
                            {machine.type}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <StatusBadge status={machine.status} />
                        </td>

                        
                        <td className="py-4 px-6 text-center">
                          <div className="inline-flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              title="Visualizar detalhes"
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-[#7000ff] hover:bg-[#7000ff]/5 hover:border-[#7000ff]/40 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              title="Editar máquina"
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              title="Mais opções"
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-[#050b33] hover:bg-slate-100 hover:border-slate-300 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                        Nenhuma máquina encontrada para os filtros selecionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 8. PAGINAÇÃO E CONTAGEM */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
              <p>
                Mostrando{' '}
                <strong className="text-[#050b33] font-bold">
                  {filteredMachines.length}
                </strong>{' '}
                {filteredMachines.length === 1 ? 'máquina' : 'máquinas'}
              </p>

              {/* Botões visuais de paginação */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Página anterior"
                  disabled
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="w-8 h-8 rounded-lg bg-[#050b33] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  1
                </span>

                <button
                  type="button"
                  title="Próxima página"
                  disabled
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
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

function SummaryCard({
  icon,
  title,
  value,
  onClick,
  isSelected = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border bg-white p-5 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-4 ${
        isSelected
          ? 'border-[#7000ff] ring-2 ring-[#7000ff]/20'
          : 'border-[#dfe4ee] hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p className="text-xs font-semibold text-[#56617d] leading-none mb-1.5">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-[#050b33] tracking-tight">
            {value}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
    </div>
  );
}

function StatusBadge({ status }: { status: MachineStatus }) {
  if (status === 'Em operação') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
        Em operação
      </span>
    );
  }

  if (status === 'Disponível') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
        <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
        Disponível
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]">
      <span className="w-2 h-2 rounded-full bg-[#64748b]" />
      Inativo
    </span>
  );
}
