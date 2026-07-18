<h3 align="center">go(al!) study</h3>

  <p align="center">
    Soccer ball that allows you to keep up with the action <i>and</i> keep up with your work. 
    <br /> Live scoreboard of the FIFA World Cup and beyond. 
    <br />
    <a href="https://github.com/selinayunfei/software-goalstudy"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    &middot;
    <a href="https://stardance.hackclub.com/projects/27955">Dev Logs</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project


![Ball in action](/media/BALL.JPG)

Do you want to keep up with the match, but can't because you don't have TSN or cable TV? Can't because you have work, or you have to study? Want to larp being a football fan?

Made for Hack Club's Stardance Challenge and during the midst of the 2026 FIFA World Cup, "go(al!) study" is a portable, easily customisable live scoreboard that displays the current score and time of a football / soccer match for a user hard at work - or otherwise. 

Live data is derived from <a href = "https://api-sports.io/">API-Sports</a> and displayed onto an OLED display by a Raspberry pi which is mounted into a real ball. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* <a href = "https://www.raspberrypi.com/products/raspberry-pi-2-model-b/"> Raspberry Pi 2 Model B</a>
* <a href = "https://www.digikey.com/en/products/detail/winstar-display/WEA012864DWPP3N00003/20533255"> OLED display </a>
* <a href = "https://api-sports.io/"> API-Sports </a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To make your own version of this project, follow the next couple of simple steps to set up your software software. 

### Installation

1. Get a free API Key at [API-Sports](https://api-sports.io/). Their free plan offers 100 requests per 24 hours. 
2. Clone the repo
   ```sh
   git clone https://github.com/selinayunfei/software-goalstudy
   ```
"site version", "node_modules", and "media" can be ignored. 

3. Install Adafruit's Python Library.
   ```sh
   pip install adafruit-circuitpython-ssd1306
   ```
4. Enter your API in `api-info` and `oled_display_copy.py`. 
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

   ```pi
   API_KEY = "ENTER YOUR API"
   ```

5. If you do not want to request data from the FIFA World Cup, run `api-info.js` to view which clubs and leagues are playing. 

<br />

All active games will be present. The output will look like this: 
   ```
    [43'] AIK Stockholm 0 - 0 Gais
    113 
    [44'] Ostersunds FK 1 - 0 Landskrona BoIS
    114
    [43'] EIF 0 - 0 JäPS
    1087
   ```

For each game, the first line includes time elapsed, team names, and score. The second line is the league number. Return for `oled_display_copy.py` and change the `1` in the following line to the desired league number:

` url = "https://v3.football.api-sports.io/fixtures?league=1&live=all"`

6. Connect to your RaspberryPi via SSH and copy code over. To run, activate a virtual environment and run the following line:
`python3 \path\to\oled_display_copy.py`

Conversely, you can set up your Pi such that the program runs automatically when the Pi boots. Run in terminal:
```
sudo nano /etc/systemd/system/myscript.service
```
Then, in the configuration, paste: 
```sh
[Unit]
Description=My Python Script Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/your_user/oled_display_copy.py #change to your path
WorkingDirectory=/home/your_user/
StandardOutput=inherit
StandardError=inherit
Restart=always
User=your_user #if not pi

[Install]
WantedBy=multi-user.target
```
Save and exit (Ctrl + O, Enter, Ctrl + X). Then in terminal, run:
```sh
sudo systemctl daemon-reload
sudo systemctl enable myscript.service
```

7. Optional: disembowl and soccer ball and attach mount your OLED display and insert your RaspberryPi into it. 
<br />
I personally cut a hole in the ball for easier access to its insides and a small rectangle on the other side. I attached the OLED display to the skin of the ball with paperclips such that it was aligned with the small rectangular hole. I put my Pi in there, leaving a hole for the charger. Then, I doodled a little :) That's it!


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Selina Yunfei Shuai - [@Yunfei Shuai](https://hackclub.enterprise.slack.com/team/U08234LELFP) on Slack - selinayunfei@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>