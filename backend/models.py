from ast import For, In
from code import interact
from enum import unique
from inspect import CO_ASYNC_GENERATOR
from operator import index
from turtle import back, circle
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship

from database import Base

class User(Base):

    __tablename__ = "thanhvien"

    masoTV = Column(Integer, primary_key=True, index=True, unique=True)
    hoTen = Column(String)
    namSinh = Column(Date)
    tienSuBL = Column(String)

    phieuXuat = relationship("Export", back_populates="owner")
    donThuoc = relationship("donThuoc", back_populates="owner")

class Item(Base):

    __tablename__ = "thuocvaTBYT"

    masoTB = Column(Integer, primary_key=True, index=True, unique=True)
    loaiTB = Column(String)
    tenTB = Column(String)
    donViTinh = Column(String)
    ghiChu = Column(String)
    soLuong = Column(Integer)

    phieuNhap = relationship("Import", back_populates="thietbi")
    phieuXuat = relationship("Export", back_populates="thietbi")
    donThuoc = relationship("chiTietDon", back_populates="thietbi")

class Import(Base):

    __tablename__ = "chitietphieunhap"

    maPhieuNhap = Column(Integer, primary_key=True, index=True, unique=True)
    masoTB = Column(Integer, ForeignKey("thuocvaTBYT.masoTB"))
    soluongNhap = Column(Integer)
    hanSD = Column(DateTime)
    ghiChu = Column(String)
    ngayNhap = Column(DateTime)

    thietbi = relationship("Item", back_populates="phieuNhap")

class Export(Base):

    __tablename__ = "chitietphieuxuat"

    maPhieuXuat = Column(Integer, primary_key=True, index=True, unique=True)
    masoTV = Column(Integer, ForeignKey("thanhvien.masoTV"))
    masoTB = Column(Integer, ForeignKey("thuocvaTBYT.masoTB"))
    soluongXuat = Column(Integer)
    ngayXuat = Column(DateTime)

    thietbi = relationship("Item", back_populates="phieuXuat")
    owner = relationship("User", back_populates="phieuXuat")

class donThuoc(Base):

    __tablename__ = "donThuoc"

    maDonThuoc = Column(Integer, primary_key=True, index=True, unique=True)
    masoTV = Column(Integer, ForeignKey("thanhvien.masoTV"))
    ngayTao = Column(DateTime)

    owner = relationship("User", back_populates="donThuoc")
    chiTietDon = relationship("chiTietDon", back_populates="donThuoc")

class chiTietDon(Base):

    __tablename__ = "chiTietDon"

    maso = Column(Integer, primary_key=True, unique=True, index=True)
    maDonThuoc = Column(Integer, ForeignKey("donThuoc.maDonThuoc"))
    masoTB = Column(Integer, ForeignKey("thuocvaTBYT.masoTB"))
    lieuLuong = Column(Integer)
    benhAn = Column(String)

    thietbi = relationship("Item", back_populates="donThuoc")
    donThuoc = relationship("donThuoc", back_populates="chiTietDon")
