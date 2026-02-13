
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LuBot as Bot, LuPencil as Edit, LuTrash2 as Trash2 } from 'react-icons/lu';
import type { Agent } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AgentListProps {
    onEdit: (agent: Agent) => void;
}

export const AgentList = ({ onEdit }: AgentListProps) => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAgents = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/agents/`);
            setAgents(response.data);
        } catch (error) {
            console.error("Failed to fetch agents", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this agent?')) {
            try {
                await axios.delete(`${API_URL}/api/v1/agents/${id}`);
                setAgents(agents.filter(agent => agent.id !== id));
            } catch (error) {
                console.error("Failed to delete agent", error);
            }
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    if (loading) {
        return <div className="p-6 text-white flex items-center space-x-2 animate-pulse">Loading agents...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Your Agents</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <div key={agent.id} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3 rounded-xl text-purple-300 border border-white/5 shadow-inner">
                                <Bot size={24} className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" />
                            </div>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit(agent)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(agent.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-purple-200 transition-colors">{agent.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{agent.model}</p>
                        <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                            <span className="text-gray-500 font-mono text-xs">ID: {agent.id}</span>
                            <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">Ready</span>
                        </div>
                    </div>
                ))}

                {agents.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed backdrop-blur-sm">
                        <Bot size={48} className="mx-auto mb-4 opacity-30" />
                        <p>No agents found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
