from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://root:root@localhost:5432/autism"
db = SQLAlchemy(app)

# Create a Flask app context
app.app_context().push()

# Create the database tables within the app context
db.create_all()

@app.route("/")
def hello():
    return "Hello, World!"

if __name__ == "__main__":
    app.run()