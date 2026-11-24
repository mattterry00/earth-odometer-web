"""Use the real US App Store page on published builds once Apple lists the app."""
import json
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

APP = "6837449073"
try:
    with urlopen(f"https://itunes.apple.com/lookup?id={APP}&country=us", timeout=8) as response:
        listings = json.load(response)["results"]
except (OSError, URLError, ValueError, KeyError):
    listings = []
if any(str(app.get("trackId")) == APP and app.get("bundleId") == "com.earthodometer.app" for app in listings):
    page = Path("index.html")
    html = page.read_text()
    store = f"https://apps.apple.com/us/app/id{APP}"
    html = html.replace('href="#launch" data-store-link', f'href="{store}" data-store-link')
    html = html.replace("Get an App Store launch notification", "Download Earth Odometer on the App Store")
    html = html.replace("COMING SOON TO THE", "DOWNLOAD ON THE").replace("<small>COMING SOON</small>", "<small>DOWNLOAD ON THE</small>")
    html = html.replace("App Store launch</a>", "View on the App Store</a>").replace(">Launch updates</a>", ">Get the app</a>")
    html = html.replace("Earth Odometer is in private testing. Get an email when the public App Store download is ready.", "Download Earth Odometer on your iPhone to start tracking.")
    html = html.replace("COMING TO iPHONE", "FOR iPHONE").replace("https://form.jotform.com/263228212239049", store).replace("Notify me at App Store launch ↗", "Download on the App Store ↗")
    page.write_text(html)
