import asyncio
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db.session import AsyncSessionLocal
from app.seed.seed import seed_destinations, seed_activities
from sqlalchemy import select, func
from app.models import Destination, ActivityCatalog

async def main():
    async with AsyncSessionLocal() as session:
        print("Upserting destinations...")
        destinations = await seed_destinations(session)
        print("Upserting activities...")
        await seed_activities(session, destinations)
        await session.commit()

        d_count = await session.scalar(select(func.count()).select_from(Destination))
        a_count = await session.scalar(select(func.count()).select_from(ActivityCatalog))
        k_count = await session.scalar(select(func.count()).select_from(Destination).where(Destination.region == "Karnataka"))
        print(f"Committed successfully! Total Destinations: {d_count}, Total Activities: {a_count}, Karnataka Destinations: {k_count}")

if __name__ == "__main__":
    asyncio.run(main())
