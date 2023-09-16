# Import the Base class
from .base import Base
from .. import db, ma

# Define the Patient model based on Base
class Patient(Base):
    __tablename__ = "patients"
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    # Define the __init__ method
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    # Define the __repr__ method
    def __repr__(self):
        return f"<Patient '{self.name}'>"

# Define the PatientSchema
class PatientSchema(ma.Schema):
    class Meta:
        model = Patient
        # Fields to expose
        id = ma.UUID(dump_only=True)
        name = ma.String(required=True)
        age = ma.Integer(required=True)

# Initialize the PatientSchema
patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)
