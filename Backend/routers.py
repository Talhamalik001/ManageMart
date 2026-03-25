from fastapi import APIRouter

from routes import auth, user, product, video, order
from routes import google_auth, facebook_auth, instagram_auth
from routes import protected
from routes import Cloudinaryvideos

router = APIRouter()

# Auth
router.include_router(auth.router, prefix="/api/auth")

# User
router.include_router(user.router, prefix="/api/user")

# Products
router.include_router(product.router, prefix="/api/products")

# Videos
router.include_router(video.router, prefix="/api/videos")

# Orders
router.include_router(order.router, prefix="/api/orders")

# Social Auth
router.include_router(google_auth.router, prefix="/api/google")
router.include_router(facebook_auth.router, prefix="/api/facebook")
router.include_router(instagram_auth.router, prefix="/api/instagram")

# Protected
router.include_router(protected.router, prefix="/api/protected")
router.include_router(Cloudinaryvideos.router, prefix="/api/protected")
