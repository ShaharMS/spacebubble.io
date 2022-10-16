from __future__ import annotations

from abc import ABC, abstractmethod, abstractproperty
from typing import Any, List
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement


class AbstractSeleniumElement(ABC):
    @abstractmethod
    def find_element(self, by: By, value: str) -> AbstractSeleniumElement:
        raise NotImplemented
    
    @abstractmethod
    def find_elements(self, by: By, value: str) -> List[AbstractSeleniumElement]:
        raise NotImplemented
    
    @abstractproperty
    def text(self) -> str:
        raise NotImplemented
    
    @abstractmethod
    def get_attribute(self, name: str):
        raise NotImplemented

    
class SeleniumElement(AbstractSeleniumElement):
    def __init__(self, web_element: WebElement) -> None:
        self.web_element = web_element

    def find_element(self, by: By, value: str) -> AbstractSeleniumElement:
        return SeleniumElement(self.web_element.find_element(by, value))
    
    def find_elements(self, by: By, value: str) -> List[AbstractSeleniumElement]:
        return [SeleniumElement(element) for element in self.web_element.find_elements(by, value)]
    
    @property
    def text(self) -> str:
        return self.web_element.text
    
    def get_attribute(self, name: Any) -> str:
        return self.web_element.get_attribute(name)
 
