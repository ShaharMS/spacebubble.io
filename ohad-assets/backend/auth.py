from flask import Blueprint, render_template

from backend.scrap import Driver
from backend.scrap import Scrapper
from selenium import webdriver
from backend import constants

PAGES = {
    "index": "index.html",
    "timer": "timer-page.html"
}

views = Blueprint("auth", __name__, template_folder=constants.TEMPLATE_FOLDER)


@views.route("/")
def index():
    with Scrapper(constants.URL, Driver(webdriver.Chrome(constants.CHROME_PATH)), constants.WANTED_LINES_NUMBERS) as scrapper:
        min_list = scrapper.get_bus_dates()
    min_list = str(list(map(lambda min_: int(min_), min_list)))[1:-1]
    return render_template(PAGES["index"], min_list=min_list)


@views.route("/timer/<next_bus>")
def timer(next_bus):
    return render_template(PAGES["timer"], next_bus=next_bus)
