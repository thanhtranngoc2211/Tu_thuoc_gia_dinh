from sqlalchemy.orm import Session

import models, schemas

#def get_user(db: Session, user_id: int):
#
#    return db.query(models.User).filter(models.User.masoTV == user_id).first()

#def get_user_by_email(db: Session, email: str):
#
#    return db.query(models.User).filter(models.User.email == email).first()
#
def get_users(db: Session):

    return db.query(models.User).all()

def update_user(db: Session, user: schemas.User):

    db_post = db.query(models.User).filter(models.User.masoTV == user.masoTV).first()
    db_post.hoTen = user.hoTen
    db_post.namSinh = user.namSinh
    db_post.tienSuBL = user.tienSuBL
    db.commit()
    db.refresh(db_post)
    return db_post

def get_imports (db: Session):
    return db.query(models.Import).all()

def get_items(db: Session):

    return db.query(models.Item).all()

def create_user_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_user_order(db: Session, order: schemas.OrderBase):
    db_item = models.donThuoc(**order.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_order_information(db: Session, order: schemas.OrderCreate):
    db_item = models.chiTietDon(**order.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_user_import(db: Session, order: schemas.Import):
    db_item = models.Import(**order.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_user_export(db: Session, order: schemas.Import):
    db_item = models.Export(**order.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def add_item_quantity(db:Session, masoTB, quantity):
    db_post = db.query(models.Item).filter(models.Item.masoTB == masoTB).first()
    db_post.soLuong = db_post.soLuong + quantity
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_item_quantity(db:Session, masoTB, quantity):
    db_post = db.query(models.Item).filter(models.Item.masoTB == masoTB).first()
    db_post.soLuong = db_post.soLuong - quantity
    db.commit()
    db.refresh(db_post)
    return db_post