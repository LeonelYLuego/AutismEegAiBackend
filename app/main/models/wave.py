from sqlalchemy.dialects.postgresql import UUID
# Import the Base class
from .base import Base
from .. import db, ma

# Define the Wave model based on Base
class Wave(Base):
    __tablename__ = "waves"
    study_id = db.Column(UUID(as_uuid=True), db.ForeignKey('studies.id'), nullable=False)
    fp1 = db.Column(db.Float, nullable=False)
    af3 = db.Column(db.Float, nullable=False)
    f3 = db.Column(db.Float, nullable=False)
    f7 = db.Column(db.Float, nullable=False)
    fc5 = db.Column(db.Float, nullable=False)
    fc1 = db.Column(db.Float, nullable=False)
    c3 = db.Column(db.Float, nullable=False)
    t7 = db.Column(db.Float, nullable=False)
    cp5 = db.Column(db.Float, nullable=False)
    cp1 = db.Column(db.Float, nullable=False)
    p3 = db.Column(db.Float, nullable=False)
    p7 = db.Column(db.Float, nullable=False)
    po3 = db.Column(db.Float, nullable=False)
    o1 = db.Column(db.Float, nullable=False)
    oz = db.Column(db.Float, nullable=False)
    pz = db.Column(db.Float, nullable=False)
    fp2 = db.Column(db.Float, nullable=False)
    af4 = db.Column(db.Float, nullable=False)
    fz = db.Column(db.Float, nullable=False)
    f4 = db.Column(db.Float, nullable=False)
    f8 = db.Column(db.Float, nullable=False)
    fc6 = db.Column(db.Float, nullable=False)
    fc2 = db.Column(db.Float, nullable=False)
    cz = db.Column(db.Float, nullable=False)
    c4 = db.Column(db.Float, nullable=False)
    t8 = db.Column(db.Float, nullable=False)
    cp6 = db.Column(db.Float, nullable=False)
    cp2 = db.Column(db.Float, nullable=False)
    p4 = db.Column(db.Float, nullable=False)
    p8 = db.Column(db.Float, nullable=False)
    po4 = db.Column(db.Float, nullable=False)
    o2 = db.Column(db.Float, nullable=False)

    # Define the __init__ method
    def __init__(self, study_id, fp1, af3, f3, f7, fc5, fc1, c3, t7, cp5, cp1, p3, p7, po3, o1, oz, pz, fp2, af4, fz, f4, f8, fc6, fc2, cz, c4, t8, cp6, cp2, p4, p8, po4, o2):
        self.study_id = study_id
        self.fp1 = fp1
        self.af3 = af3
        self.f3 = f3
        self.f7 = f7
        self.fc5 = fc5
        self.fc1 = fc1
        self.c3 = c3
        self.t7 = t7
        self.cp5 = cp5
        self.cp1 = cp1
        self.p3 = p3
        self.p7 = p7
        self.po3 = po3
        self.o1 = o1
        self.oz = oz
        self.pz = pz
        self.fp2 = fp2
        self.af4 = af4
        self.fz = fz
        self.f4 = f4
        self.f8 = f8
        self.fc6 = fc6
        self.fc2 = fc2
        self.cz = cz
        self.c4 = c4
        self.t8 = t8
        self.cp6 = cp6
        self.cp2 = cp2
        self.p4 = p4
        self.p8 = p8
        self.po4 = po4
        self.o2 = o2
    
    # Define the __repr__ method
    def __repr__(self):
        return f"<Wave '{self.id}-{self.study_id}'>"
    
# Define the WaveSchema
class WaveSchema(ma.Schema):
    class Meta:
        model = Wave
        # Fields to expose
        id = ma.UUID(dump_only=True)
        study_id = ma.UUID(required=True)
        fp1 = ma.Float(required=True)
        af3 = ma.Float(required=True)
        f3 = ma.Float(required=True)
        f7 = ma.Float(required=True)
        fc5 = ma.Float(required=True)
        fc1 = ma.Float(required=True)
        c3 = ma.Float(required=True)
        t7 = ma.Float(required=True)
        cp5 = ma.Float(required=True)
        cp1 = ma.Float(required=True)
        p3 = ma.Float(required=True)
        p7 = ma.Float(required=True)
        po3 = ma.Float(required=True)
        o1 = ma.Float(required=True)
        oz = ma.Float(required=True)
        pz = ma.Float(required=True)
        fp2 = ma.Float(required=True)
        af4 = ma.Float(required=True)
        fz = ma.Float(required=True)
        f4 = ma.Float(required=True)
        f8 = ma.Float(required=True)
        fc6 = ma.Float(required=True)
        fc2 = ma.Float(required=True)
        cz = ma.Float(required=True)
        c4 = ma.Float(required=True)
        t8 = ma.Float(required=True)
        cp6 = ma.Float(required=True)
        cp2 = ma.Float(required=True)
        p4 = ma.Float(required=True)
        p8 = ma.Float(required=True)
        po4 = ma.Float(required=True)
        o2 = ma.Float(required=True)

# Initialize the WaveSchema
wave_schema = WaveSchema()
waves_schema = WaveSchema(many=True)
