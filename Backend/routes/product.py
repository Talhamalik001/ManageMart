from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.product import Product as ProductModel
from schemas.product import Product
from functools import lru_cache

router = APIRouter()


# ✅ CREATE PRODUCT
@router.post("/")
def add_product(product: Product):
    db: Session = SessionLocal()

    new_product = ProductModel(**product.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    db.close()

    return {
        "message": "Product added",
        "product": {
            "id": new_product.id,
            "name": new_product.name,
            "price": new_product.price
        }
    }


@router.get("/caching")
@lru_cache(maxsize=1)
def get_products():
    db: Session = SessionLocal()
    products = db.query(ProductModel).all()
    db.close()

    result = []
    for p in products:
        result.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "category": p.category,
            "image": p.image
        })
    return result

# ✅ GET ALL PRODUCTS
@router.get("/")
def get_products():
    db: Session = SessionLocal()

    products = db.query(ProductModel).all()

    result = []
    for p in products:
        result.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "category": p.category,
            "image": p.image
        })

    db.close()
    return result


# ✅ GET SINGLE PRODUCT
@router.get("/{product_id}")
def get_product(product_id: int):
    db: Session = SessionLocal()

    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()

    if not product:
        db.close()
        raise HTTPException(status_code=404, detail="Product not found")

    db.close()

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "image": product.image
    }


# ✅ UPDATE PRODUCT
@router.put("/{product_id}")
def update_product(product_id: int, updated_data: Product):
    db: Session = SessionLocal()

    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()

    if not product:
        db.close()
        raise HTTPException(status_code=404, detail="Product not found")

    # update fields
    product.name = updated_data.name
    product.description = updated_data.description
    product.price = updated_data.price
    product.category = updated_data.category
    product.image = updated_data.image

    db.commit()
    db.refresh(product)
    db.close()

    return {"message": "Product updated"}


# ✅ DELETE PRODUCT
@router.delete("/{product_id}")
def delete_product(product_id: int):
    db: Session = SessionLocal()

    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()

    if not product:
        db.close()
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    db.close()

    return {"message": "Product deleted"}

