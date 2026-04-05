import os
import logging

from extracted_prices import extract_prices
from currency_api import get_eur_usd_status


def main():
    os.makedirs("logs", exist_ok=True)

    logging.basicConfig(
        filename="logs/app.log",
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s"
    )

    logging.info("System started")

    try:
        print("Running Lidl price extraction...\n")
        products = extract_prices()
        logging.info(f"Lidl extraction finished with {len(products)} products")

        print("\nRunning currency API check...\n")
        currency_result = get_eur_usd_status()
        logging.info("Currency API check finished")

        print("\nCurrency result:")
        print(currency_result)

    except Exception as e:
        print("System error:", e)
        logging.error(f"System error: {e}")

    logging.info("System finished")


if __name__ == "__main__":
    main()