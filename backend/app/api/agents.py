
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_session
from app.models.agent import Agent

router = APIRouter()

@router.post("/", response_model=Agent)
async def create_agent(agent: Agent, session: AsyncSession = Depends(get_session)):
    session.add(agent)
    await session.commit()
    await session.refresh(agent)
    return agent

@router.get("/", response_model=List[Agent])
async def get_agents(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Agent))
    return result.scalars().all()

@router.get("/{agent_id}", response_model=Agent)
async def get_agent(agent_id: int, session: AsyncSession = Depends(get_session)):
    agent = await session.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.put("/{agent_id}", response_model=Agent)
async def update_agent(agent_id: int, agent_data: Agent, session: AsyncSession = Depends(get_session)):
    agent = await session.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent_data_dict = agent_data.dict(exclude_unset=True)
    for key, value in agent_data_dict.items():
        setattr(agent, key, value)
    
    session.add(agent)
    await session.commit()
    await session.refresh(agent)
    return agent

@router.delete("/{agent_id}")
async def delete_agent(agent_id: int, session: AsyncSession = Depends(get_session)):
    agent = await session.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    await session.delete(agent)
    await session.commit()
    return {"ok": True}
