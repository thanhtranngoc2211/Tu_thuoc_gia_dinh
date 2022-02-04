from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel

class ItemBase(BaseModel):

    masoTB: int
    loaiTB: str
    tenTB: str
    donViTinh: str
    ghiChu: Optional[str] = None
    soLuong: int

    class Config:
        orm_mode = True

class ItemCreate(ItemBase):

    pass

class OrderBase(BaseModel):
    maDonThuoc: int
    masoTV: int
    ngayTao: datetime

    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    maso: int
    maDonThuoc: int
    masoTB: int
    lieuLuong: Optional[int] = None
    benhAn: Optional[str] = None

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    masoTV: int
    hoTen: str

class User(UserBase):
    namSinh: date
    tienSuBL: Optional[str] = None

    class Config:
        orm_mode = True

class Import(BaseModel):
    maPhieuNhap: int
    masoTB: int
    soluongNhap: int
    hanSD: datetime
    ghiChu: Optional[str] = None
    ngayNhap: datetime

    class Config:
        orm_mode = True

class Export(BaseModel):
    maPhieuXuat: int
    masoTV: int
    masoTB: int
    soluongXuat: int
    ngayXuat: datetime

    class Config:
        orm_mode = True

