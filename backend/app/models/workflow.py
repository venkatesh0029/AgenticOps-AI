
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

from sqlalchemy import JSON, Column

class Workflow(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    status: str = Field(default="draft") # draft, active, archived
    tasks: List[dict] = Field(default=[], sa_column=Column(JSON)) 
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
