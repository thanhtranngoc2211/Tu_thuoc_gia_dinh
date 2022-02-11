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
    allow_origins = ['*'],
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

@app.get("/users/", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users

@app.post("/users/create/", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)) :
    user = crud.create_user(db, user=user)
    return user

@app.delete("/users/delete", response_model=schemas.User)
def delete_user(user: schemas.UserBase, db: Session = Depends(get_db)) :
    user = crud.delete_user(db, id=user.masoTV)
    return user

@app.post("/users/update/", response_model=schemas.User)
def update_user(user: schemas.User, db: Session = Depends(get_db)) :
    user = crud.update_user(db, user=user)
    return user

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

@app.get("/exports/", response_model=List[schemas.Export])
def read_exports(db: Session = Depends(get_db)):
    exports = crud.get_exports(db)
    return exports

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