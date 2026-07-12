# a copy of the oled display. edits and code will be written here before deployed and debugged on raspberry pi

from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1306
import board
import busio
import time

# getting data from api, setting up
import requests
API_KEY = "ce6f5e66ea3dd490c999a5fc1bfcf848"

# general variables
team1 = ""
team2 = ""

score1 = 0
score2 = 0

pen1 = None
pen2 = None

status = ""

elapsed = 0
elapsed_seconds = 0
extra = None

#country codes 
codes = {
    "Norway": "NOR",
    "England": "ENG",
    "Argentina": "ARG",
    "Switzerland": "SUI",
    "France": "FRA",
    "Spain": "ESP",

}

def fetchLiveScores():
    global team1, team2
    global score1, score2
    global pen1, pen2
    global elapsed
    global elapsed_seconds
    global status
    global extra

    headers = {
        "x-apisports-key": API_KEY
    }

    url = "https://v3.football.api-sports.io/fixtures?league=1&live=all"

    try: 
        response = requests.get(url, headers=headers)
        data = response.json()
    except requests.RequestException:
        return

    if len(data["response"]) == 0:
        status = "MO"
        return
    
    match = data["response"][0]

    home = match["teams"]["home"]["name"]
    away = match["teams"]["away"]["name"]

    team1 = codes.get(home, home[:3].upper())
    team2 = codes.get(away, away[:3].upper())

    score1 = match["goals"]["home"]
    score2 = match["goals"]["away"]

    pen1 = match["score"]["penalty"]["home"]
    pen2 = match["score"]["penalty"]["away"]

    elapsed = match["fixture"]["status"]["elapsed"]
    extra = match["fixture"]["status"]["extra"]

    status = match["fixture"]["status"]["short"]

    if extra is None:
        elapsed_seconds = elapsed*60
    else: 
        elapsed_seconds = (elapsed+extra)*60


def update_timer():
    global elapsed_seconds
    global elapsed
    
    if status not in ["HT","P","PEN","FT","AET"]:
        elapsed_seconds += 1
        elapsed = elapsed_seconds // 60

#setting up OLED_display
i2c = busio.I2C(board.SCL,board.SDA)

WIDTH = 128
HEIGHT = 64
BORDER = 3

oled = adafruit_ssd1306.SSD1306_I2C(WIDTH, HEIGHT, i2c, addr=0x3C)

oled.fill(0)
oled.show()

image = Image.new("1", (oled.width, oled.height))
draw = ImageDraw.Draw(image)


def update_oled():
    # drawing OLED display
    draw.rectangle((0,0, oled.width, oled.height), outline=255, fill=255)
    draw.rectangle(
            (BORDER, BORDER, oled.width-BORDER-1, oled.height - BORDER - 1),
            outline=0,
            fill=0,
    )

    font = ImageFont.load_default()

    if status == "P":
        team_1_score = f"{score1} ({pen1})"
        draw.text((10,10), team_1_score, font=font, fill=255)

        draw.text((WIDTH/2,10),"-",font=font,fill=255)
        
        team_2_score = f"{score2} ({pen2})"
        draw.text((100,10), team_2_score, font=font, fill=255)
    
    else:
        draw.text((12,10),str(score1),font=font, fill=255)
        draw.text((WIDTH/2,10),"-",font=font,fill=255)
        draw.text((102,10),str(score2),font=font,fill=255)

    #countries 
    draw.text((10, 25), team1, font=font, fill=255)
    draw.text((100,25), team2, font=font, fill=255)

    #time
    seconds = elapsed_seconds % 60

    if elapsed >= 90 and extra != None:
        timer = f"90+{extra + (elapsed-90)}"
    elif elapsed == 45 and extra != None:
        timer = f"45+{extra+(elapsed-45)}"
    else:
        timer = f"{elapsed}:{seconds:02}"
    
    time_width = draw.textlength(timer, font=font)
    draw.text((int((WIDTH-time_width)/2), 40), timer, font=font, fill=255)

    #match status
    if status =="1H":
        status_text = "FIRST HALF"
    elif status == "HT":
        status_text = "HALF-TIME"
    elif status == "2H":
        status_text = "SECOND HALF"
    elif status in ("ET","BT"):
        status_text = "EXTRA TIME"
    elif status == "P":
        status_text = "PENALTIES"
    else:
        status_text = "MATCH OVER"

    status_width = draw.textlength(status_text, font=font)
    draw.text((int((WIDTH-status_width)/2), 50), status_text, font=font, fill=255)

    oled.image(image)
    oled.show()


fetchLiveScores()
last_fetch = time.time()
match_over = False

while True:
    if (not match_over) and (time.time() - last_fetch >= 300):
        fetchLiveScores()
        last_fetch = time.time()

        if status in ("MO","FT","AET","PEN"):
            match_over = True
    
    if not match_over:
        update_timer()
    update_oled()
    time.sleep(1)