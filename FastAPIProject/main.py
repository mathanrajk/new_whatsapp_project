from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import time
import pyautogui
import webbrowser

app = FastAPI()

# 1. This fixes the CORS Error!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows your React app to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 2. These models fix the 500 Internal Server Error!
# They must match the JSON format sent from React perfectly.
class SongLine(BaseModel):
    id: int
    content: str


class Payload(BaseModel):
    personName: str
    songData: List[SongLine]


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/send")
def send_data(payload: Payload):
    # Now this will successfully print without throwing a 500 error
    print(f"Name : {payload.personName}")
    print(f"Count : {len(payload.songData)}")

    webbrowser.open("https://web.whatsapp.com/")
    time.sleep(10)
    pyautogui.moveTo(100, 150)
    pyautogui.click()
    for i in range(1, 5):
        pyautogui.press('tab')

    pyautogui.write(payload.personName)
    pyautogui.press('enter')

    for i in range(0, len(payload.songData)):
        pyautogui.write(payload.songData[i].content)
        time.sleep(1)
        time.sleep(1)
        pyautogui.press('enter')
        pyautogui.press("esc")
        time.sleep(0.5)
        pyautogui.press('enter')
        time.sleep(1)
    return {
        "message": f"Received {len(payload.songData)} lines for {payload.personName}",
        "status": "ok"
    }
