
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from app.engine.agent import app as agent_app

router = APIRouter()

class ChatRequest(BaseModel):
    messages: List[Dict[str, Any]]

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Check if messages have 'role' and 'content'
        formatted_messages = []
        for msg in request.messages:
            if 'role' not in msg or 'content' not in msg:
                raise HTTPException(status_code=400, detail="Invalid message format")
            
            # Simple conversion for now
            if msg['role'] == 'user':
                formatted_messages.append(("user", msg['content']))
            elif msg['role'] == 'assistant':
                formatted_messages.append(("assistant", msg['content']))
            else:
                 formatted_messages.append(("user", msg['content'])) # Default fallback
        
        inputs = {"messages": formatted_messages}
        result = await agent_app.ainvoke(inputs)
        
        # Extract the last message
        last_message = result['messages'][-1]
        
        return {
            "role": "assistant",
            "content": last_message.content
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
