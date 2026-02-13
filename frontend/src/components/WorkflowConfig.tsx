
import { useState } from 'react';
import axios from 'axios';
import { LuLoader as Loader2, LuSave as Save } from 'react-icons/lu';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const WorkflowConfig = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState('[]');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);
        try {
            await axios.post(`${API_URL}/api/v1/workflows/`, {
                name,
                description,
                tasks: JSON.parse(tasks),
                status: "active"
            });
            setMessage({ type: 'success', text: 'Workflow created successfully!' });
            setName('');
            setDescription('');
            setTasks('[]');
        } catch (error) {
            console.error(error);
            let errorMsg = 'Failed to create workflow.';
            if (axios.isAxiosError(error)) {
                errorMsg = error.response?.data?.detail || error.message;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            setMessage({ type: 'error', text: `Error: ${errorMsg}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Create New Workflow</h1>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                {/* Subtle gradient overlay inside card */}
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />

                {message && (
                    <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-red-500/10 text-red-300 border-red-500/20'} backdrop-blur-sm`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Workflow Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="e.g. Daily Research Digest"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="Summarizes top 5 news articles..."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Tasks (JSON Array)</label>
                        <div className="relative">
                            <textarea
                                value={tasks}
                                onChange={(e) => setTasks(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white h-48 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:outline-none transition-all font-mono text-sm placeholder:text-gray-600 shadow-inner resize-none"
                                placeholder='[{"step": 1, "agent_id": 1, "instruction": "Research..."}]'
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-black/60 px-2 py-1 rounded">JSON Format</div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !name}
                            className={`flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-white/10 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            <span>{loading ? 'Creating...' : 'Save Workflow'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


