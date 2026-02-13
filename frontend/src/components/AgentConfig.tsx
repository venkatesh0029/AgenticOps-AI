import { useState } from 'react';
import axios from 'axios';
import { LuLoader as Loader2, LuSave as Save } from 'react-icons/lu';
import type { Agent } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AgentConfigProps {
    initialData?: Agent | null;
    onCancel?: () => void;
    onSave?: () => void;
}

export const AgentConfig = ({ initialData, onCancel, onSave }: AgentConfigProps) => {
    const [name, setName] = useState(initialData?.name || '');
    const [model, setModel] = useState(initialData?.model || 'gpt-4o');
    const [systemPrompt, setSystemPrompt] = useState(initialData?.system_prompt || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);
        try {
            if (initialData) {
                await axios.put(`${API_URL}/api/v1/agents/${initialData.id}`, {
                    name,
                    model,
                    system_prompt: systemPrompt
                });
                setMessage({ type: 'success', text: 'Agent updated successfully!' });
            } else {
                await axios.post(`${API_URL}/api/v1/agents/`, {
                    name,
                    model,
                    system_prompt: systemPrompt
                });
                setMessage({ type: 'success', text: 'Agent created successfully!' });
            }

            setTimeout(() => {
                setMessage(null);
                if (onSave) onSave();
            }, 1000);

            if (!initialData) {
                setName('');
                setSystemPrompt('');
            }
        } catch (error) {
            console.error(error);
            let errorMsg = 'Failed to handle request.';
            if (axios.isAxiosError(error)) {
                errorMsg = error.response?.data?.detail || error.message || 'Failed to create agent.';
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            setMessage({ type: 'error', text: `Error: ${errorMsg}` });
            setTimeout(() => setMessage(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto relative">
            {message && (
                <div className={`fixed bottom-6 right-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/90 text-white border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-red-500/90 text-white border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]'} backdrop-blur-md z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 flex items-center gap-2`}>
                    {message.type === 'success' ? <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> : null}
                    {message.text}
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{initialData ? 'Edit Agent' : 'Create New Agent'}</h1>
                {onCancel && (
                    <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                )}
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                {/* Subtle gradient overlay inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />



                <div className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Agent Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="e.g. Research Assistant"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Model</label>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none transition-all cursor-pointer shadow-inner appearance-none"
                            style={{ backgroundImage: "none" }} // Custom dropdown arrow would be better here, keeping native for now
                        >
                            <option value="gpt-4o" className="bg-gray-900">GPT-4o</option>
                            <option value="claude-3-5-sonnet" className="bg-gray-900">Claude 3.5 Sonnet</option>
                            <option value="llama-3-local" className="bg-gray-900">Llama 3 (Local)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">System Prompt</label>
                        <textarea
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white h-48 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none transition-all font-mono text-sm placeholder:text-gray-600 shadow-inner resize-none"
                            placeholder="You are a helpful AI assistant..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !name || !systemPrompt}
                            className={`flex items-center space-x-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] border border-white/10 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            <span>{loading ? 'Saving...' : (initialData ? 'Update Agent' : 'Create Agent')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
