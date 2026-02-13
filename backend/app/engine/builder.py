
import json
from langgraph.graph import StateGraph, END
from typing import Dict, Any, List

from app.engine.state import AgentState
from app.models.agent import Agent
from app.models.workflow import Workflow

# Mock Node function for now - in real implementation this would call the LLM
async def agent_node(state: AgentState, agent_name: str, instruction: str):
    print(f"--- Executing Agent: {agent_name} ---")
    # Simulate LLM processing
    result = f"Processed '{instruction}' by {agent_name}"
    
    return {
        "messages": [{"role": "assistant", "content": result, "name": agent_name}],
        "results": {agent_name: result}
    }

def build_workflow_graph(workflow: Workflow, agents_map: Dict[int, Agent]):
    """
    Constructs a LangGraph runnable from the Workflow definition.
    Assumes workflow.tasks is a JSON list of steps:
    [
        {"step": 1, "agent_id": 1, "instruction": "Research topic X"},
        {"step": 2, "agent_id": 2, "instruction": "Summarize result"}
    ]
    """
    workflow_tasks = workflow.tasks if isinstance(workflow.tasks, list) else json.loads(workflow.tasks)
    workflow_tasks.sort(key=lambda x: x.get("step", 0))

    graph_builder = StateGraph(AgentState)
    
    # Create nodes for each task
    previous_node = None
    
    for i, task in enumerate(workflow_tasks):
        agent_id = task.get("agent_id") or task.get("agentId")
        instruction = task.get("instruction") or task.get("prompt") or ""
        agent = agents_map.get(agent_id)
        
        if not agent:
            continue
            
        node_name = f"step_{i+1}_{agent.name.replace(' ', '_')}"
        
        # We need to bind arguments to the node function
        # Using a closure/wrapper to capture specific task details
        async def node_fn(state: AgentState, _agent=agent, _instruction=instruction):
            return await agent_node(state, _agent.name, _instruction)
            
        graph_builder.add_node(node_name, node_fn)
        
        if previous_node:
            graph_builder.add_edge(previous_node, node_name)
        else:
            graph_builder.set_entry_point(node_name)
            
        previous_node = node_name
    
    if previous_node:
        graph_builder.add_edge(previous_node, END)
        
    return graph_builder.compile()
