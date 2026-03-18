# routes/protected.py
from fastapi import APIRouter, Depends, HTTPException, Request
from utils.jwt import verify_access_token

router = APIRouter()

# Protected route that requires authentication
@router.get("/protected")
async def protected_route(request: Request):
    # Get token from cookies
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing or expired")

    # Verify the token
    user = verify_access_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return {"message": f"Hello {user}, this is a protected route!"}