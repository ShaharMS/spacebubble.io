from typing import List

from backend.scrap import Scrapper
from backend.scrap.test.fakes.fake_element import FakeElement
from backend.scrap.test.fakes.fake_driver import FakeDriver


def create_html_columns(line_num, line_mim):
    return [
        FakeElement,
        FakeElement(text=line_num),
        *[FakeElement() for _ in range(4)],
        FakeElement(text=line_mim)
    ]


def create_html_row(columns: List[FakeElement]) -> FakeElement:
    return FakeElement(
            attributes_dict={"class": "TableLine ng-scope"},
            elements_to_return=columns
            )


def put_data_in_fake_driver(lines: List[tuple[str, str]]):
    rows = []
    for line_num, line_mim in lines:
        columns = create_html_columns(line_num, line_mim)
        rows.append(create_html_row(columns))
    return FakeDriver(elements_to_return=rows)


class TestUnitScrapper:
    def test_get_bus_dates(self):
        test_data = [("20", "5"), ("40", "↓בתחנה"), ("30", "20")]
        with Scrapper("fake_url", put_data_in_fake_driver(test_data), ["20", "40"]) as s:
            assert s.get_bus_dates() == ["5"]

    def test_get_row_data(self):
        pass
