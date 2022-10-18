import os
import pathlib

URL = "https://www.bus.gov.il/#/realtime/1/0/2/38297"

WANTED_LINES_NUMBERS = ["64", "364", "287"]
WAIT_TIME = 3
BACKEND_PATH = os.path.dirname(os.path.abspath(__file__))
CHROME_PATH = f"{BACKEND_PATH}\\{'chromedriver.exe'}"
TEMPLATE_FOLDER = f"{pathlib.Path(BACKEND_PATH).parent}\\frontend"
