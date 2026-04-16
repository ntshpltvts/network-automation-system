import requests
import json
import os
import logging
from datetime import datetime


def get_eur_usd_status():
    # Start logging for the API stage
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
        # API endpoints for latest and historical EUR to USD exchange rates
        today_url = "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD"
        yesterday_url = "https://api.frankfurter.dev/v1/2026-04-01?base=EUR&symbols=USD"

        # Send HTTP GET requests to the API
        today_response = requests.get(today_url, timeout=10)
        yesterday_response = requests.get(yesterday_url, timeout=10)

        logging.info(f"Today API status code: {today_response.status_code}")
        logging.info(f"Yesterday API status code: {yesterday_response.status_code}")

        # Stop early if the API request failed
        if today_response.status_code != 200:
            logging.warning("Today's API request failed")
            return result

        if yesterday_response.status_code != 200:
            logging.warning("Yesterday's API request failed")
            return result

        # Parse JSON responses into Python dictionaries
        today_data = today_response.json()
        yesterday_data = yesterday_response.json()

        # Validate the expected structure before reading nested values
        if "rates" not in today_data or "USD" not in today_data["rates"]:
            logging.warning("USD rate not found in today's API response")
            return result

        if "rates" not in yesterday_data or "USD" not in yesterday_data["rates"]:
            logging.warning("USD rate not found in yesterday's API response")
            return result

        # Extract the exchange rates from the API data
        result["today_rate"] = today_data["rates"]["USD"]
        result["yesterday_rate"] = yesterday_data["rates"]["USD"]

        # Compare today's rate with yesterday's rate
        if result["today_rate"] > result["yesterday_rate"]:
            result["status"] = "up"
        elif result["today_rate"] < result["yesterday_rate"]:
            result["status"] = "down"
        else:
            result["status"] = "same"

        # Ensure raw data folder exists before saving JSON
        os.makedirs("data/raw", exist_ok=True)

        # Save both raw API data and processed comparison result
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

    # Return the processed API result to the main controller
    return result