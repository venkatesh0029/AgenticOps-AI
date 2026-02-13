
import asyncio
import httpx

BASE_URL = "http://localhost:8000/api/v1"

async def test_agents():
    async with httpx.AsyncClient() as client:
        # Create Agent
        print("Creating agent...")
        response = await client.post(f"{BASE_URL}/agents/", json={
            "name": "Test Agent",
            "model": "gpt-4o",
            "system_prompt": "You are a test agent."
        })
        print(f"Create Agent Status: {response.status_code}")
        if response.status_code != 200:
            print(f"Error: {response.text}")
            return
        
        agent_id = response.json()["id"]
        print(f"Created Agent ID: {agent_id}")

        # List Agents
        print("Listing agents...")
        response = await client.get(f"{BASE_URL}/agents/")
        print(f"List Agents Status: {response.status_code}")
        agents = response.json()
        print(f"Found {len(agents)} agents.")
        
        found = any(a["id"] == agent_id for a in agents)
        print(f"Agent found in list: {found}")

async def test_workflows():
    async with httpx.AsyncClient() as client:
        # Create Workflow
        print("\nCreating workflow...")
        response = await client.post(f"{BASE_URL}/workflows/", json={
            "name": "Test Workflow",
            "description": "A test workflow",
            "tasks": [{"step": 1, "instruction": "Do something", "agent_id": 1}],
            "status": "draft"
        })
        print(f"Create Workflow Status: {response.status_code}")
        if response.status_code != 200:
            try:
                print(f"Error: {response.text}")
            except:
                pass
            return

        workflow_id = response.json()["id"]
        print(f"Created Workflow ID: {workflow_id}")

        # List Workflows
        print("Listing workflows...")
        response = await client.get(f"{BASE_URL}/workflows/")
        print(f"List Workflows Status: {response.status_code}")
        workflows = response.json()
        print(f"Found {len(workflows)} workflows.")
        
        found = any(w["id"] == workflow_id for w in workflows)
        print(f"Workflow found in list: {found}")

async def main():
    try:
        await test_agents()
        await test_workflows()
    except Exception as e:
        print(f"Test failed: {e}")

if __name__ == "__main__":
    asyncio.run(main())
