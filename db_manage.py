import sys
from sqlalchemyseeder import ResolvingSeeder
from app.main import db
from manage import app

app.app_context().push()

def seed_database():
    # Push the app context
    # Get the db session
    session = db.session
    # Create the seeder
    seeder = ResolvingSeeder(session)
    new = seeder.load_entities_from_json_file('app/static/data/seed.json')
    # Add the entities to the session
    session.add_all(new)
    # Commit the session
    session.commit()

def create_database():
    db.create_all()

def drop_database():
    db.drop_all()

if __name__ == '__main__':
    # Check the flag passed
    if len(sys.argv) > 1:
        if sys.argv[1] == 'create':
            create_database()
            seed_database()
        elif sys.argv[1] == 'drop':
            drop_database()
    else:
        print('Please pass a flag to this script')
        print('Options: seed, create')