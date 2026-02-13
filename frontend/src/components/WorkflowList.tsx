
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LuActivity as Activity, LuPlay as Play, LuTrash2 as Trash2, LuX as X, LuCircleCheck as CheckCircle, LuLoader as Loader2 } from 'react-icons/lu';
import type { Workflow } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ExecutionResult {
    status: string;
    results: Record<string, string>;
    messages: any[]; // Keeping any[] for messages as structure varies
}

export const WorkflowList = () => {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState(true);
    const [executingId, setExecutingId] = useState<number | null>(null);
    const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
    const [showResultModal, setShowResultModal] = useState(false);

    const fetchWorkflows = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/workflows/`);
            setWorkflows(response.data);
        } catch (error) {
            console.error("Failed to fetch workflows", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this workflow?')) {
            try {
                await axios.delete(`${API_URL}/api/v1/workflows/${id}`);
                setWorkflows(workflows.filter(w => w.id !== id));
            } catch (error) {
                console.error("Failed to delete workflow", error);
            }
        }
    };

    const handleRun = async (id: number) => {
        setExecutingId(id);
        setExecutionResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/v1/workflows/${id}/run`);
            setExecutionResult(response.data);
            setShowResultModal(true);
        } catch (error) {
            console.error("Failed to run workflow", error);
            alert("Failed to run workflow. See console for details.");
        } finally {
            setExecutingId(null);
        }
    };

    const closeResultModal = () => {
        setShowResultModal(false);
        setExecutionResult(null);
    }

    useEffect(() => {
        fetchWorkflows();
    }, []);

    if (loading) {
        return <div className="p-6 text-white">Loading workflows...</div>;
    }

    return (
        <div className="p-6 relative">
            <h1 className="text-2xl font-bold text-white mb-6">Your Workflows</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.map((workflow) => (
                    <div key={workflow.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-600/20 p-3 rounded-lg text-purple-400">
                                <Activity size={24} />
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleRun(workflow.id)}
                                    disabled={executingId === workflow.id}
                                    className={`text-gray-400 hover:text-green-400 transition-colors ${executingId === workflow.id ? 'animate-pulse text-green-500' : ''}`}
                                    title="Run Workflow"
                                >
                                    {executingId === workflow.id ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(workflow.id)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                    title="Delete Workflow"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1">{workflow.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{workflow.description || "No description"}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">ID: {workflow.id}</span>
                            <span className={`px-2 py-1 rounded text-xs ${workflow.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                {workflow.status}
                            </span>
                        </div>
                    </div>
                ))}

                {workflows.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-12 bg-gray-800/50 rounded-xl border border-gray-800 border-dashed">
                        <Activity size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No workflows created yet.</p>
                    </div>
                )}
            </div>

            {/* Execution Result Modal */}
            {showResultModal && executionResult && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <CheckCircle className="text-green-400" size={24} />
                                Execution Results
                            </h3>
                            <button onClick={closeResultModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-uppercase text-gray-500 mb-2 tracking-wider">Results by Agent</h4>
                                    <div className="grid gap-4">
                                        {Object.entries(executionResult.results || {}).map(([agent, result]) => (
                                            <div key={agent} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                                <div className="text-purple-400 font-medium mb-2 text-sm">{agent}</div>
                                                <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{String(result)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-uppercase text-gray-500 mb-2 tracking-wider">Message Log</h4>
                                    <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 font-mono text-xs text-gray-400 h-48 overflow-y-auto">
                                        {executionResult.messages.map((msg, i) => (
                                            <div key={i} className="mb-2">
                                                <span className="text-blue-500">[{msg.name || msg.role}]</span>: {msg.content}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-700 flex justify-end">
                            <button
                                onClick={closeResultModal}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
