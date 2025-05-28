import httpx

API_URL = "https://dsm-p4-g07-2025-7.onrender.com/batimentos/animal/68194120636f719fcd5ee5fd"

async def buscar_batimentos(pagina: int = 0, tamanho: int = 50):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_URL}?page={pagina}&size={tamanho}")
        response.raise_for_status()
        return response.json()["content"]
