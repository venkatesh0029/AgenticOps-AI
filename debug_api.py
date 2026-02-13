
import requests
import json

base_url = "http://localhost:8000/api/v1/workflows"

def print_response(response):
    print(f"Status: {response.status_code}")
    try:
        print(json.dumps(response.json(), indent=2))
    except:
        print(response.text)

try:
    # 1. Create Workflow
    print("Creating workflow...")
    workflow_data = {
        "name": "Test Workflow",
        "description": "A test workflow executed from script",
        "tasks": json.dumps([
            {"step": 1, "agent_id": 1, "instruction": "Say hello"},
            {"step": 2, "agent_id": 1, "instruction": "Say goodbye"}
        ]),
        "status": "active"
    }
    response = requests.post(f"{base_url}/", json=workflow_data)
    print_response(response)
    
    if response.status_code != 200:
        print("Failed to create workflow")
        exit(1)
        
    workflow_id = response.json()["id"]
    print(f"Created workflow ID: {workflow_id}")

    # 2. Run Workflow
    print(f"Running workflow {workflow_id}...")
    response = requests.post(f"{base_url}/{workflow_id}/run")
    print_response(response)

except Exception as e:
    print(f"Error: {e}")
