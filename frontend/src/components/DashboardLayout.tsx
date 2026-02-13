
import type { ReactNode, ComponentType } from 'react';
import { LuLayoutDashboard as LayoutDashboard, LuUsers as Users, LuActivity as Activity, LuSettings as Settings, LuLogOut as LogOut } from 'react-icons/lu';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: ComponentType<{ size?: number | string, className?: string }>, label: string, active?: boolean }) => {
    return (
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </div>
    );
};

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen bg-[#0a0518] text-white overflow-hidden relative selection:bg-purple-500/30">
            {/* Radiant Background Effects - duplicated here if this layout is used standalone, otherwise children render in App's context */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />

            {/* Sidebar */}
            <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col z-10 relative">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        AgentOps AI
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={Users} label="Agents" />
                    <SidebarItem icon={Activity} label="Workflows" />
                    <SidebarItem icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <SidebarItem icon={LogOut} label="Logout" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden z-10 relative">
                <header className="h-16 border-b border-white/5 bg-black/10 backdrop-blur-md flex items-center justify-between px-6">
                    <h2 className="text-lg font-medium text-white/90 capitalize tracking-wide">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold shadow-lg border border-white/20">
                            AO
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {children}
                </main>
            </div>
        </div>
    );
};
