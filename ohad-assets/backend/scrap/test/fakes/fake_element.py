from typing import List, Optional, Union
from selenium.webdriver.common.by import By

from backend.scrap.element import AbstractSeleniumElement


class FakeElement(AbstractSeleniumElement):
    def __init__(self, text: Optional[str] = None,
                 attributes_dict: Optional[dict[str, str]] = None,
                 elements_to_return: Optional[Union[AbstractSeleniumElement, List[AbstractSeleniumElement]]] = None):
        self._text = text
        self.attributes_dict = attributes_dict
        self.elements_to_return = elements_to_return

    @property
    def text(self) -> str:
        return self._text

    def get_attribute(self, name: str) -> str:
        return self.attributes_dict[name]

    def find_element(self, by: By, value: str) -> AbstractSeleniumElement:
        return self.elements_to_return
    
    def find_elements(self, by: By, value: str) -> List[AbstractSeleniumElement]:
        return self.elements_to_return
