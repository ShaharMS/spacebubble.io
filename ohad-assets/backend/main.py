from flask import Flask
from backend.auth import views
from backend import constants


app = Flask(__name__, template_folder=constants.TEMPLATE_FOLDER, static_folder=constants.TEMPLATE_FOLDER)
app.register_blueprint(views)
app.run(debug=True, port=4996)
