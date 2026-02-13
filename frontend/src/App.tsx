import { useState } from 'react';
import type { IconType } from 'react-icons';
import { AgentConfig } from './components/AgentConfig';
import { AgentList } from './components/AgentList';
import { WorkflowList } from './components/WorkflowList';
import { WorkflowConfig } from './components/WorkflowConfig';
import { LuLayoutDashboard as LayoutDashboard, LuUsers as Users, LuActivity as Activity, LuSettings as SettingsIcon, LuPlus as Plus, LuLogOut as LogOut } from 'react-icons/lu';
import type { Agent } from './types';
import { Settings } from './components/Settings';


const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: IconType, label: string, active?: boolean, onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${active
        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
        : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/5 border border-transparent'
        }`}
    >
      <Icon size={20} className={active ? "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" : "group-hover:text-purple-300 transition-colors"} />
      <span className="font-medium tracking-wide">{label}</span>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [showCreateWorkflow, setShowCreateWorkflow] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="flex h-screen bg-[#0a0518] text-white overflow-hidden relative selection:bg-purple-500/30">
      {/* Radiant Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-fuchsia-900/10 blur-[100px] pointer-events-none" />

      {/* Sidebar */}
      <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col z-10 relative">
        <div className="p-6">
          <h1
            onClick={() => { setActiveTab('dashboard'); setShowCreateAgent(false); setShowCreateWorkflow(false); }}
            className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] cursor-pointer hover:opacity-80 transition-opacity"
          >
            AgentOps AI
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setShowCreateAgent(false); setShowCreateWorkflow(false); }} />
          <SidebarItem icon={Users} label="Agents" active={activeTab === 'agents'} onClick={() => { setActiveTab('agents'); setShowCreateAgent(false); setSelectedAgent(null); setShowCreateWorkflow(false); }} />
          <SidebarItem icon={Activity} label="Workflows" active={activeTab === 'workflows'} onClick={() => { setActiveTab('workflows'); setShowCreateWorkflow(false); setShowCreateAgent(false); }} />
          <SidebarItem icon={SettingsIcon} label="Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setShowCreateAgent(false); setShowCreateWorkflow(false); }} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem icon={LogOut} label="Logout" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden z-10 relative">
        <header className="h-16 border-b border-white/5 bg-black/10 backdrop-blur-md flex items-center justify-between px-6">
          <h2 className="text-lg font-medium text-white/90 capitalize tracking-wide">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            {activeTab === 'agents' && !showCreateAgent && (
              <button
                onClick={() => { setShowCreateAgent(true); setSelectedAgent(null); }}
                className="flex items-center space-x-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_25px_rgba(192,38,211,0.5)] border border-white/10"
              >
                <Plus size={16} />
                <span>New Agent</span>
              </button>
            )}
            {activeTab === 'workflows' && !showCreateWorkflow && (
              <button
                onClick={() => setShowCreateWorkflow(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_25px_rgba(192,38,211,0.5)] border border-white/10"
              >
                <Plus size={16} />
                <span>New Workflow</span>
              </button>
            )}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold shadow-lg border border-white/20">
              AO
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] group">
                  <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Active Agents</h3>
                  <p className="text-3xl font-bold text-white mt-2 group-hover:text-purple-200 transition-colors">12</p>
                  <div className="mt-4 flex items-center text-emerald-400 text-sm">
                    <span className="bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">+2.5%</span>
                    <span className="ml-2 text-gray-500">from last week</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] group">
                  <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Runs</h3>
                  <p className="text-3xl font-bold text-white mt-2 group-hover:text-purple-200 transition-colors">1,248</p>
                  <div className="mt-4 flex items-center text-blue-400 text-sm">
                    <span className="bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">+18%</span>
                    <span className="ml-2 text-gray-500">from last week</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] group">
                  <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Success Rate</h3>
                  <p className="text-3xl font-bold text-white mt-2 group-hover:text-purple-200 transition-colors">98.2%</p>
                  <div className="mt-4 flex items-center text-fuchsia-400 text-sm">
                    <span className="bg-fuchsia-500/10 px-2.5 py-1 rounded-full border border-fuchsia-500/20">+0.8%</span>
                    <span className="ml-2 text-gray-500">from last week</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white/90 mb-6">Recent Activity</h3>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/20">
                  <div className="p-5 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="text-gray-300 text-sm flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                      Workflow Execution #8492
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-full shadow-[0_0_10px_rgba(16,185,129,0.1)]">Completed</span>
                  </div>
                  <div className="p-5 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="text-gray-300 text-sm flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                      Agent "Researcher" update
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs rounded-full shadow-[0_0_10px_rgba(59,130,246,0.1)]">System</span>
                  </div>
                  <div className="p-5 flex justify-between items-center hover:bg-white/5 transition-colors">
                    <span className="text-gray-300 text-sm flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                      Workflow Execution #8491
                    </span>
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs rounded-full shadow-[0_0_10px_rgba(239,68,68,0.1)]">Failed</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === 'agents' && (
            (showCreateAgent || selectedAgent) ? (
              <AgentConfig
                initialData={selectedAgent}
                onCancel={() => { setShowCreateAgent(false); setSelectedAgent(null); }}
                onSave={() => { setShowCreateAgent(false); setSelectedAgent(null); }}
              />
            ) : (
              <AgentList onEdit={(agent: Agent) => { setSelectedAgent(agent); }} />
            )
          )}
          {activeTab === 'workflows' && (
            showCreateWorkflow ? <WorkflowConfig /> : <WorkflowList />
          )}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;

