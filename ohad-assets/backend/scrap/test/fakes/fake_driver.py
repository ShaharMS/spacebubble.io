from typing import List, Optional, Union

from selenium.webdriver.common.by import By

from backend.scrap.driver import AbstractDriver
from backend.scrap.element import AbstractSeleniumElement


class FakeDriver(AbstractDriver):
    def __init__(
            self,
            elements_to_return: Optional[Union[AbstractSeleniumElement, List[AbstractSeleniumElement]]] = None
    ):
        self.elements_to_return = elements_to_return
        self.loaded_url = None

    def find_element(self, by: By, value: str) -> AbstractSeleniumElement:
        return self.elements_to_return

    def find_elements(self, by: By, value: str) -> List[AbstractSeleniumElement]:
        return self.elements_to_return

    def __enter__(self):
        pass

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass

    def get(self, url: str) -> None:
        self.loaded_url = url

