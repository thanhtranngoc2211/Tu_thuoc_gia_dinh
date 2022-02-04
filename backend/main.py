from typing import List
from unicodedata import name
from urllib import response

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "*"
]

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#@app.post("/users/", response_model=schemas.User)
#def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#    db_user = crud.get_user_by_email(db=db, email=user.email)
#    if db_user:
#        raise HTTPException(status_code=400, detail="Email already registered")
#    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users

@app.post("/users/update/", response_model=schemas.User)
def update_user(user: schemas.User, db: Session = Depends(get_db)) :
    user = crud.update_user(db, user=user)
    return user

#@app.get("/users/{user_id}", response_model=schemas.User)
#def read_user(user_id: int, db: Session = Depends(get_db)):
#    db_user = crud.get_user(db, user_id=user_id)
#    if db_user is None:
#        raise HTTPException(status_code=404, detail="User not found")
#    return db_user
#
@app.post("/create_items/", response_model=schemas.ItemBase)
def create_item_for_user(
    item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item)

@app.get("/items/", response_model=List[schemas.ItemBase])
def read_items(db: Session = Depends(get_db)):
    items = crud.get_items(db)
    return items
@app.get("/imports/", response_model=List[schemas.Import])
def read_imports(db: Session = Depends(get_db)):
    imports = crud.get_imports(db)
    return imports

@app.post("/create_order/", response_model=schemas.OrderBase)
def create_order_for_user(item: schemas.OrderBase, infor: schemas.OrderCreate, db: Session = Depends(get_db)):
    items = crud.create_user_order(db=db, order=item)
    crud.create_order_information(db=db, order=infor)
    return items

@app.post("/create_import/", response_model=schemas.Import)
def create_import_for_user(item: schemas.Import, db: Session = Depends(get_db)):
    items = crud.create_user_import(db=db, order=item)
    quantity = item.soluongNhap
    masoTB = item.masoTB
    crud.add_item_quantity(db=db, masoTB=masoTB, quantity=quantity)
    return items

@app.post("/create_export/", response_model=schemas.Export)
def create_export_for_user(item: schemas.Export, db: Session = Depends(get_db)):
    items = crud.create_user_export(db=db, order=item)
    quantity = item.soluongXuat
    masoTB = item.masoTB
    crud.delete_item_quantity(db=db, masoTB=masoTB, quantity=quantity)
    return items