import { useState } from 'react';
import { LuSave as Save, LuBell as Bell, LuShield as Shield, LuGlobe as Globe, LuMoon as Moon, LuMonitor as Monitor } from 'react-icons/lu';

export const Settings = () => {
    const [apiKey, setApiKey] = useState('sk-........................');
    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState('dark');

    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = () => {
        // Simulate saving
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Settings
            </h1>

            {message && (
                <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-red-500/10 text-red-300 border-red-500/20'} backdrop-blur-sm animate-fade-in`}>
                    {message.text}
                </div>
            )}

            {/* General Settings */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-purple-500/30 transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Globe className="text-purple-400" size={24} />
                    General
                </h2>

                <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-300 font-medium">Theme Preference</p>
                            <p className="text-gray-500 text-sm">Choose how AgentOps looks.</p>
                        </div>
                        <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
                            <button
                                onClick={() => setTheme('dark')}
                                className={`px-4 py-2 rounded-md text-sm transition-all ${theme === 'dark' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Moon size={16} className="inline mr-2" /> Dark
                            </button>
                            <button
                                onClick={() => setTheme('light')}
                                className={`px-4 py-2 rounded-md text-sm transition-all ${theme === 'light' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Monitor size={16} className="inline mr-2" /> System
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-pink-500/30 transition-all">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />

                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Bell className="text-pink-400" size={24} />
                    Notifications
                </h2>

                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <p className="text-gray-300 font-medium">Email Alerts</p>
                        <p className="text-gray-500 text-sm">Receive updates on workflow completions.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600 shadow-inner"></div>
                    </label>
                </div>
            </div>

            {/* API Keys */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Shield className="text-emerald-400" size={24} />
                    Security & API
                </h2>

                <div className="space-y-4 relative z-10">
                    <label className="block text-gray-300 font-medium">OpenAI API Key</label>
                    <div className="flex gap-4">
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:outline-none transition-all font-mono text-sm"
                        />
                        <button className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl hover:bg-emerald-600/30 transition-colors">
                            Regenerate
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Last used: 2 hours ago</p>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/10 hover:-translate-y-0.5 active:scale-95"
                >
                    <Save size={20} />
                    <span>Save Changes</span>
                </button>
            </div>
        </div>
    );
};
