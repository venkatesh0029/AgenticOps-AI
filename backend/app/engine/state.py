
from typing import TypedDict, Annotated, List, Dict, Any
import operator

class AgentState(TypedDict):
    messages: Annotated[List[Dict[str, Any]], operator.add]
    current_agent: str
    results: Dict[str, Any]
