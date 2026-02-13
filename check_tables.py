
import sqlite3
import os

db_path = 'backend/database.db'
if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables:", tables)
    
    if ('workflow',) in tables:
        cursor.execute("PRAGMA table_info(workflow);")
        columns = cursor.fetchall()
        print("Workflow columns:", columns)
    else:
        print("Table 'workflow' not found.")
        
    conn.close()
except Exception as e:
    print(f"Error: {e}")
