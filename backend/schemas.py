from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel

class ItemBase(BaseModel):

    masoTB: int
    loaiTB: str
    tenTB: str
    hanSD: Optional[date]
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

class OrderSearch(BaseModel):
    id_donThuoc: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    masoTV: int

class User(UserBase):
    hoTen: str
    namSinh: date
    tienSuBL: Optional[str] = None

    class Config:
        orm_mode = True

class Import(BaseModel):
    maPhieuNhap: int
    masoTB: int
    soluongNhap: int
    hanSD: Optional[date] = None
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

