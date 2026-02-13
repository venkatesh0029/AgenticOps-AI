
from typing import TypedDict, Annotated, List, Union
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
import operator

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]

def call_model(state: AgentState):
    messages = state['messages']
    # Placeholder for actual LLM call
    # In a real scenario, this would call OpenAI/Anthropic
    last_message = messages[-1]
    response = AIMessage(content=f"Echo: {last_message.content}")
    return {"messages": [response]}

workflow = StateGraph(AgentState)

workflow.add_node("agent", call_model)
workflow.set_entry_point("agent")
workflow.add_edge("agent", END)

app = workflow.compile()
