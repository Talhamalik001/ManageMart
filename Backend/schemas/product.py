from pydantic import BaseModel

class Product(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str  # base64 ya URL