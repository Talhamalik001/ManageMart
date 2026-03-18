from fastapi import APIRouter, HTTPException, Request
from database import SessionLocal
from models.order import Order
import stripe
import os



router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")  # tumhara stripe secret

# Create Stripe Payment Intent
@router.post("/create-payment-intent")
def create_payment_intent(data: dict):
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(data['amount'] * 100),  # in cents
            currency='usd',
            payment_method_types=['card'],
        )
        return {"clientSecret": intent['client_secret']}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Save order after payment
@router.post("/place-order")
def place_order(data: dict):
    db = SessionLocal()
    order = Order(
        product_name=data['product_name'],
        product_price=data['product_price'],
        product_image=data['product_image'],
        user_email=data['user_email'],
        status="Paid"
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    db.close()
    return order

# Get all orders
@router.get("/all")
def get_orders():
    db = SessionLocal()
    orders = db.query(Order).all()
    db.close()
    return orders