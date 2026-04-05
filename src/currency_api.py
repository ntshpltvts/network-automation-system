import requests
import json
import os
import logging
from datetime import datetime


def get_eur_usd_status():
    logging.info("Starting currency API request")

    checked_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    result = {
        "base": "EUR",
        "target": "USD",
        "today_rate": None,
        "yesterday_rate": None,
        "status": "unknown",
        "checked_at": checked_at
    }

    try:
        today_url = "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD"
        yesterday_url = "https://api.frankfurter.dev/v1/2026-04-01?base=EUR&symbols=USD"

        today_response = requests.get(today_url, timeout=10)
        yesterday_response = requests.get(yesterday_url, timeout=10)

        logging.info(f"Today API status code: {today_response.status_code}")
        logging.info(f"Yesterday API status code: {yesterday_response.status_code}")

        today_data = today_response.json()
        yesterday_data = yesterday_response.json()

        result["today_rate"] = today_data["rates"]["USD"]
        result["yesterday_rate"] = yesterday_data["rates"]["USD"]

        if result["today_rate"] > result["yesterday_rate"]:
            result["status"] = "up"
        elif result["today_rate"] < result["yesterday_rate"]:
            result["status"] = "down"
        else:
            result["status"] = "same"

        os.makedirs("data/raw", exist_ok=True)

        with open("data/raw/currency_rates.json", "w", encoding="utf-8") as file:
            json.dump(
                {
                    "today": today_data,
                    "yesterday": yesterday_data,
                    "comparison": result
                },
                file,
                indent=4
            )

        logging.info("Currency API data saved successfully")

    except Exception as e:
        logging.error(f"Currency API error: {e}")
        print("Currency API error:", e)

    return result