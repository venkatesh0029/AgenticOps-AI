export interface Agent {
    id: number;
    name: string;
    model: string;
    description?: string;
    system_prompt: string;
    created_at?: string;
    updated_at?: string;
}

export interface WorkflowTask {
    step: number;
    agent_id: number;
    instruction: string;
}

export interface Workflow {
    id: number;
    name: string;
    description?: string;
    status: string;
    tasks: WorkflowTask[];
    created_at?: string;
    updated_at?: string;
}
