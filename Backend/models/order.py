from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    product_price = Column(Float)
    product_image = Column(String)
    user_email = Column(String)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)