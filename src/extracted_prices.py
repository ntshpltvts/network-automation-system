from bs4 import BeautifulSoup
import re
import csv
import os
import logging
from datetime import datetime


def extract_prices():
    logging.info("Starting Lidl price extraction")

    products = []
    checked_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        file_path = "config/lidl.html"

        with open(file_path, "r", encoding="utf-8") as file:
            html = file.read()

        logging.info("HTML file loaded successfully")

        soup = BeautifulSoup(html, "html.parser")

        lines = soup.get_text(separator="\n").split("\n")
        clean_lines = []

        for line in lines:
            line = line.strip()
            if line != "":
                clean_lines.append(line)

        print("Product output:\n")

        for i in range(len(clean_lines)):
            line = clean_lines[i]

            match = re.search(r"€\s?(\d+\.\d{2})", line)

            if match:
                price = match.group(1)
                product = clean_lines[i - 1] if i > 0 else "Unknown"

                if product.startswith("-") or product.lower() == "per pack":
                    continue

                plus_price = ""

                if i < len(clean_lines) - 1 and "With Lidl Plus" in clean_lines[i + 1]:
                    for j in range(i + 2, min(i + 5, len(clean_lines))):
                        plus_match = re.search(r"€\s?(\d+\.\d{2})", clean_lines[j])
                        if plus_match:
                            plus_price = plus_match.group(1)
                            break

                print("Product:", product)
                print("Normal price:", price)

                if plus_price:
                    print("Lidl Plus price:", plus_price)

                print("-----")

                products.append({
                    "product_name": product,
                    "normal_price": price,
                    "lidl_plus_price": plus_price,
                    "checked_at": checked_at
                })
        if not products:
            logging.warning("No Lidl products were extracted")

        logging.info(f"Extracted {len(products)} products")

        os.makedirs("data/processed", exist_ok=True)

        output_file = "data/processed/lidl_prices.csv"

        with open(output_file, "w", newline="", encoding="utf-8") as file:
            fieldnames = ["product_name", "normal_price", "lidl_plus_price", "checked_at"]
            writer = csv.DictWriter(file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(products)

        logging.info(f"CSV file saved successfully: {output_file}")
        print(f"\nSaved CSV file to: {output_file}")

    except Exception as e:
        logging.error(f"Error in extraction: {e}")
        print("Error in extraction:", e)

    return products