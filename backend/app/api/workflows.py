
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_session
from app.models.workflow import Workflow

router = APIRouter()

@router.post("/", response_model=Workflow)
async def create_workflow(workflow: Workflow, session: AsyncSession = Depends(get_session)):
    try:
        session.add(workflow)
        await session.commit()
        await session.refresh(workflow)
        return workflow
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[Workflow])
async def get_workflows(session: AsyncSession = Depends(get_session)):
    try:
        result = await session.execute(select(Workflow))
        return result.scalars().all()
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{workflow_id}", response_model=Workflow)
async def get_workflow(workflow_id: int, session: AsyncSession = Depends(get_session)):
    workflow = await session.get(Workflow, workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow

@router.delete("/{workflow_id}")
async def delete_workflow(workflow_id: int, session: AsyncSession = Depends(get_session)):
    workflow = await session.get(Workflow, workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    await session.delete(workflow)
    await session.commit()
    return {"ok": True}

from app.engine.builder import build_workflow_graph
from app.models.agent import Agent

@router.post("/{workflow_id}/run")
async def run_workflow(workflow_id: int, session: AsyncSession = Depends(get_session)):
    # 1. Fetch Workflow
    workflow = await session.get(Workflow, workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    # 2. Fetch all Agents involved (optimization: fetch only needed ones)
    result = await session.execute(select(Agent))
    agents = result.scalars().all()
    agents_map = {a.id: a for a in agents}
    
    # 3. Build Graph
    try:
        app = build_workflow_graph(workflow, agents_map)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to build graph: {str(e)}")
    
    # 4. Execute Graph
    # Initial state
    initial_state = {
        "messages": [],
        "current_agent": "system",
        "results": {}
    }
    
    try:
        final_output = await app.ainvoke(initial_state)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Workflow execution failed: {str(e)}")
    
    return {
        "status": "success",
        "results": final_output.get("results"),
        "messages": final_output.get("messages")
    }
