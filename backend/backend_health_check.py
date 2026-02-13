import requests
import sys

BASE_URL = "http://localhost:8000"

def check_health():
    print(f"Checking backend health at {BASE_URL}...")
    try:
        # Check root endpoint
        response = requests.get(f"{BASE_URL}/")
        print(f"Root endpoint status: {response.status_code}")
        
        # Check agents endpoint (api/v1/agents/)
        response_agents = requests.get(f"{BASE_URL}/api/v1/agents/")
        print(f"Agents endpoint status: {response_agents.status_code}")
        
        if response.status_code == 200 and response_agents.status_code == 200:
            print("Backend appears healthy.")
            sys.exit(0)
        else:
            print("Backend returned unexpected status codes.")
            sys.exit(1)
            
    except Exception as e:
        print(f"Failed to connect to backend: {e}")
        sys.exit(1)

if __name__ == "__main__":
    check_health()
