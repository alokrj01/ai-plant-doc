from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    class_name = Column(String, unique=True, index=True) # e.g., "Potato___Early_blight"
    disease_name = Column(String) # e.g., "Potato - Early Blight"
    severity = Column(String)     # e.g., "Moderate"
    description = Column(String)
    
    #Treatment is an object that's why store in JSON format
    treatment = Column(JSON)