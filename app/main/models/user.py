# Import the Base class
from .base import Base
from .. import db, flask_bcrypt, ma

# Define the User model based on Base
class User(Base):
    __tablename__ = "users"
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    # Define the role field as a enum type
    role = db.Column(db.Enum('admin', 'user', name='roles'), default='user', nullable=False)

    # Define the __init__ method
    def __init__(self, name, email, password, role):
        self.name = name
        self.email = email
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')
        self.role = role

    # Define the verify_password method
    def verify_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)
    
    # Define the __repr__ method
    def __repr__(self):
        return f"<User '{self.name}'>"

# Define the UserSchema
class UserSchema(ma.Schema):
    class Meta:
        model = User
        # Fields to expose
        id = ma.UUID(dump_only=True)
        name = ma.String(required=True)
        email = ma.Email(required=True)
        password_hash = ma.String(required=True, load_only=True)
        role = ma.String(required=True, default='user', load_only=True)

# Initialize the UserSchema
user_schema = UserSchema()
users_schema = UserSchema(many=True)
