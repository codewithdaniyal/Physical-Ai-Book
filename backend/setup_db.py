
import os
import random
from qdrant_client import QdrantClient
from qdrant_client.http import models

# 1. Your Google Gemini Key
GEMINI_API_KEY = "AIzaSyBngs-GTVIhoG-zOuGnB8DvYTh0QfNdYso"

# 2. Your Qdrant Cluster URL (Must start with https://)
QDRANT_URL = "https://ff736f01-8120-4c66-b847-533561107d70.us-east4-0.gcp.cloud.qdrant.io" 

# 3. Your NEW Qdrant API Key (Must have 'All Operations' permission)
QDRANT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.g8IGlzekIwEDdaY-oDJSLK_rLtOXzDaA_fyj__9T9mE"

# 4. The path to your book folder (Keep the r"..." format)
DOCS_PATH = r"D:\my-ai-book\docs"


# ==========================================
# SIMULATED EMBEDDING FUNCTION
# ==========================================
def get_mock_embedding(text):
    # Generates a random vector of size 768 (Standard AI size)
    # This bypasses the Google API 429 Error
    return [random.uniform(-1.0, 1.0) for _ in range(768)]

# --- CONNECT ---
print(f"Connecting to Qdrant...")
qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY, check_compatibility=False)

# --- READ FILES ---
documents = []
if not os.path.exists(DOCS_PATH):
    print(f"❌ ERROR: Cannot find folder {DOCS_PATH}")
    exit()

for filename in os.listdir(DOCS_PATH):
    if filename.endswith(".md"):
        file_path = os.path.join(DOCS_PATH, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            documents.append({"name": filename, "text": content})

print(f"✅ Found {len(documents)} chapters.")

# --- UPLOAD TO QDRANT ---
collection_name = "physical_ai_book"
print(f"Creating collection '{collection_name}'...")

qdrant.recreate_collection(
    collection_name=collection_name,
    vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE),
)

print("Uploading chapters with Simulated Vectors...")

for doc in documents:
    try:
        # 1. Get Simulated Vector (Free & Instant)
        fake_vector = get_mock_embedding(doc["text"])
        
        # 2. Upload
        qdrant.upsert(
            collection_name=collection_name,
            points=[
                models.PointStruct(
                    id=abs(hash(doc["name"])), 
                    vector=fake_vector,
                    payload={"text": doc["text"], "filename": doc["name"]}
                )
            ]
        )
        print(f"✅ Uploaded: {doc['name']}")
    except Exception as e:
        print(f"⚠️ Error uploading {doc['name']}: {e}")

print("\n🎉 SUCCESS! Database is fully ready (Simulated Mode).")