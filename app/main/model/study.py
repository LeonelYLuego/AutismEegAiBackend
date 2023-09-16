from sqlalchemy.dialects.postgresql import UUID, VARCHAR
# Import the Base class
from .base import Base
from .. import db, ma

# Define the Study model based on Base
class Study(Base):
    __tablename__ = "studies"
    patient_id = db.Column(UUID(as_uuid=True), db.ForeignKey('patients.id'), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    result = db.Column(VARCHAR(255), nullable=False)

    # Define the __init__ method
    def __init__(self, patient_id, datetime, result):
        self.patient_id = patient_id
        self.datetime = datetime
        self.result = result
    
    # Define the __repr__ method
    def __repr__(self):
        return f"<Study '{self.id}-{self.datetime}'>"
    
# Define the StudySchema
class StudySchema(ma.Schema):
    class Meta:
        model = Study
        # Fields to expose
        id = ma.UUID(dump_only=True)
        patient_id = ma.UUID(required=True)
        datetime = ma.DateTime(required=True)
        result = ma.String(required=True)

# Initialize the StudySchema
study_schema = StudySchema()
studies_schema = StudySchema(many=True)