import csv
import logging
from datetime import datetime
from bs4 import BeautifulSoup
import re
from extracted_prices import extract_prices

def main():

    # Setup logging
    logging.basicConfig(
        filename="logs/app.log",
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s"
    )

    logging.info("System started")

    try:
        products = extract_prices()

        print("\nProducts from scraper:\n")
        for p in products:
            print(p)

        logging.info(f"Extracted {len(products)} products")

    except Exception as e:
        print("Error:", e)
        logging.error(f"Error: {e}")
        '''input_file = "config/watchlist.csv"
        output_file = "data/processed/watchlist_checked.csv"

        rows = []

        # Read CSV
        with open(input_file, mode="r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Add timestamp to each row
                row["checked_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                rows.append(row)
        
        if not rows:
            print("No data found in CSV file!")
            logging.warning("CSV file is empty")
            return

        print("Loaded data:")
        print(rows)

        # Write new CSV
        with open(output_file, mode="w", newline="") as file:
            fieldnames = rows[0].keys()
            writer = csv.DictWriter(file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(rows)

        print("New file created:", output_file)
        logging.info("File processed successfully")

    except Exception as e:
        print("Error:", e)
        logging.error(f"Error: {e}")'''
    

    logging.info("System finished")

 


if __name__ == "__main__":
    main()