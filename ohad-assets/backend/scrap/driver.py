from __future__ import annotations

import time
from abc import ABC, abstractmethod
from typing import List

from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver

from backend import constants
from backend.scrap.element import AbstractSeleniumElement
from backend.scrap.element import SeleniumElement


class AbstractDriver(ABC):
    
    @abstractmethod
    def find_element(self, by: By, value: str) -> AbstractSeleniumElement:
        raise NotImplemented
    
    @abstractmethod
    def find_elements(self, by: By, value: str) -> List[AbstractSeleniumElement]:
        raise NotImplemented

    @abstractmethod
    def __enter__(self):
        raise NotImplemented

    @abstractmethod
    def __exit__(self, exc_type, exc_val, exc_tb):
        raise NotImplemented

    @abstractmethod
    def get(self, url: str) -> None:
        raise NotImplemented


class Driver(AbstractDriver):
    def __init__(self, web_driver: WebDriver) -> None:
        self.web_driver = web_driver
    
    def find_element(self, by: By, value: str) -> AbstractSeleniumElement:
        return SeleniumElement(self.web_driver.find_element(by, value))
    
    def find_elements(self, by: By, value: str) -> List[AbstractSeleniumElement]:
        return [SeleniumElement(element) for element in self.web_driver.find_elements(by, value)]
    
    def get(self, url: str) -> None:
        self.web_driver.get(url)
        time.sleep(constants.WAIT_TIME)
    
    def __enter__(self):
        return self.web_driver.__enter__()
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        return self.web_driver.__exit__(exc_type, exc_val, exc_tb)
    
