from bs4 import BeautifulSoup
import re
import csv
import os
import logging
from datetime import datetime


def extract_prices():
    # Start logging for the Lidl scraping stage
    logging.info("Starting Lidl price extraction")

    products = []
    checked_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        file_path = "config/lidl.html"

        # Load the saved Lidl webpage
        with open(file_path, "r", encoding="utf-8") as file:
            html = file.read()

        logging.info("HTML file loaded successfully")

        # Parse the HTML into searchable text
        soup = BeautifulSoup(html, "html.parser")

        # Split page text into lines for easier processing
        lines = soup.get_text(separator="\n").split("\n")
        clean_lines = []

        # Remove empty lines and extra spaces
        for line in lines:
            line = line.strip()
            if line != "":
                clean_lines.append(line)

        print("Product output:\n")

        # Scan each line to find product prices
        for i in range(len(clean_lines)):
            line = clean_lines[i]

            # Detect euro price patterns like €1.39 or € 1.39
            match = re.search(r"€\s?(\d+\.\d{2})", line)

            if match:
                price = match.group(1)

                # Product name usually appears on the line before the main price
                product = clean_lines[i - 1] if i > 0 else "Unknown"

                # Skip lines that are clearly not product names
                if product.startswith("-") or product.lower() == "per pack":
                    continue

                plus_price = ""

                # Look ahead for a Lidl Plus discounted price near the main price
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

                # Store each extracted product as structured data
                products.append({
                    "product_name": product,
                    "normal_price": price,
                    "lidl_plus_price": plus_price,
                    "checked_at": checked_at
                })

        # Warn if no products were found in the HTML
        if not products:
            logging.warning("No Lidl products were extracted")

        logging.info(f"Extracted {len(products)} products")

        # Ensure output folder exists before saving CSV
        os.makedirs("data/processed", exist_ok=True)

        output_file = "data/processed/lidl_prices.csv"

        # Save extracted prices in CSV format
        with open(output_file, "w", newline="", encoding="utf-8") as file:
            fieldnames = ["product_name", "normal_price", "lidl_plus_price", "checked_at"]
            writer = csv.DictWriter(file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(products)

        logging.info(f"CSV file saved successfully: {output_file}")

    except Exception as e:
        logging.error(f"Error in extraction: {e}")
        print("Error in extraction:", e)

    # Return extracted products so other modules can reuse the data
    return products