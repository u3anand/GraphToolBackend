from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

app.config.from_pyfile('config.cfg')

s = URLSafeTimedSerializer('abcd')

mail = Mail(app)

app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
db.create_all()

from graphtt import routes