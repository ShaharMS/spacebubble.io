from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Tuple

from selenium import webdriver
from selenium.webdriver.common.by import By
from backend.scrap.driver import AbstractDriver, Driver

from backend.scrap.element import SeleniumElement, AbstractSeleniumElement
from backend import constants


class AbstractScrapper(ABC):
    @abstractmethod
    def get_bus_dates(self) -> List[str]:
        pass


class Scrapper(AbstractScrapper):

    def __init__(self, url, driver: AbstractDriver, wanted_lines_numbers: List[str]) -> None:
        self.wanted_lines_numbers = wanted_lines_numbers
        self.url = url
        self.driver = driver

    def __enter__(self):
        self.driver.__enter__()
        self.driver.get(self.url)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.driver.__exit__(exc_type, exc_val, exc_tb)

    def __get_row_elements(self) -> List[AbstractSeleniumElement]:
        elements = self.driver.find_elements(By.CLASS_NAME, "ng-scope")

        rows = []
        for element in elements:
            if "TableLine" in element.get_attribute("class"):
                rows.append(element)
        return rows

    @staticmethod
    def __get_row_data(rows: List[AbstractSeleniumElement]) -> List[Tuple[str, str]]:
        columns = []
        for element in rows:
            row_elements = element.find_elements(By.TAG_NAME, "td")
            columns.append((row_elements[1].text, row_elements[-1].text))
        return columns

    def __filter_lines(self, rows_data: List[Tuple[str, str]]):
        dates = []
        for data in rows_data:
            if data[0] in self.wanted_lines_numbers:
                dates.append(data[1])

        return dates

    @staticmethod
    def __filter_arrived_buses(dates: List[str]):
        new_dates = []
        for date in dates:
            if date.isdigit():
                new_dates.append(date)
        return new_dates

    def get_bus_dates(self) -> List[str]:
        rows = self.__get_row_elements()
        rows_data = Scrapper.__get_row_data(rows)
        dates = self.__filter_lines(rows_data)
        dates = Scrapper.__filter_arrived_buses(dates)
        return dates


if __name__ == "__main__":
    with Scrapper(globals.URL, Driver(webdriver.Chrome(globals.CHROME_PATH)), globals.WANTED_LINES_NUMBERS) as scrapper:
        min_list = scrapper.get_bus_dates()