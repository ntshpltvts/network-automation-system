import os
import logging
import shutil

from extracted_prices import extract_prices
from currency_api import get_eur_usd_status
from compare_prices import compare_prices
from email_notifier import send_email


def main():
    # Ensure log folder exists before configuring logging
    os.makedirs("logs", exist_ok=True)

    # Configure application logging
    logging.basicConfig(
        filename="logs/app.log",
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s"
    )

    logging.info("System started")

    try:
        # Run Lidl scraping and save current price data
        print("Running Lidl price extraction...\n")
        products = extract_prices()
        logging.info(f"Lidl extraction finished with {len(products)} products")

        # Compare current Lidl prices with the previous run
        print("\nComparing prices...\n")
        price_changes = compare_prices()

        # Retrieve and process currency exchange rate data
        print("\nRunning currency API check...\n")
        currency_result = get_eur_usd_status()
        logging.info("Currency API check finished")

        # Build one combined email message for all detected updates
        email_lines = []
        has_email_content = False

        # Add Lidl price drops to the email
        if price_changes["drops"]:
            has_email_content = True
            email_lines.append("LIDL PRICE DROPS:")
            email_lines.append("")
            for item in price_changes["drops"]:
                email_lines.append(f"- {item['product_name']}")
                email_lines.append(f"  Old price: {item['old_price']}")
                email_lines.append(f"  New price: {item['new_price']}")
                email_lines.append("")

        # Add Lidl price increases to the email
        if price_changes["increases"]:
            has_email_content = True
            email_lines.append("LIDL PRICE INCREASES:")
            email_lines.append("")
            for item in price_changes["increases"]:
                email_lines.append(f"- {item['product_name']}")
                email_lines.append(f"  Old price: {item['old_price']}")
                email_lines.append(f"  New price: {item['new_price']}")
                email_lines.append("")

        # Add currency comparison results if API data was retrieved successfully
        if currency_result["today_rate"] is not None and currency_result["yesterday_rate"] is not None:
            has_email_content = True
            email_lines.append("CURRENCY UPDATE (EUR -> USD):")
            email_lines.append("")
            email_lines.append(f"Today's rate: {currency_result['today_rate']}")
            email_lines.append(f"Yesterday's rate: {currency_result['yesterday_rate']}")
            email_lines.append(f"Status: {currency_result['status']}")
            email_lines.append("")

        # Send email only if there is something useful to report
        if has_email_content:
            email_body = "\n".join(email_lines)
            send_email(
                subject="Automation System Update",
                body=email_body
            )

        # Update the previous Lidl CSV so the next run has something to compare against
        try:
            shutil.copy(
                "data/processed/lidl_prices.csv",
                "data/processed/lidl_prices_old.csv"
            )
            logging.info("Updated lidl_prices_old.csv for next run")
        except Exception as e:
            logging.error(f"Failed to update old CSV: {e}")

    except Exception as e:
        print("System error:", e)
        logging.error(f"System error: {e}")

    logging.info("System finished")


if __name__ == "__main__":
    # Run the system only when this file is executed directly
    main()