import csv
import logging


def compare_prices():
    # Start logging for the Lidl comparison stage
    logging.info("Starting price comparison")

    old_file = "data/processed/lidl_prices_old.csv"
    new_file = "data/processed/lidl_prices.csv"

    old_prices = {}
    new_prices = {}

    # Store price changes in separate categories for reporting
    comparison_result = {
        "drops": [],
        "increases": []
    }

    try:
        # Load prices from the previous run
        with open(old_file, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                old_prices[row["product_name"]] = row["normal_price"]

        # Load prices from the current run
        with open(new_file, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                new_prices[row["product_name"]] = row["normal_price"]

        print("\nPrice changes:\n")

        changes_found = False

        # Compare current prices against previous prices by product name
        for product in new_prices:
            if product in old_prices:
                old_price = old_prices[product]
                new_price = new_prices[product]

                # Convert strings to floats for correct numeric comparison
                old_price_float = float(old_price)
                new_price_float = float(new_price)

                # Record a price drop if the new price is lower
                if new_price_float < old_price_float:
                    print(f"PRICE DROP: {product}: {old_price} -> {new_price}")
                    logging.info(f"PRICE DROP: {product}: {old_price} -> {new_price}")
                    changes_found = True

                    comparison_result["drops"].append({
                        "product_name": product,
                        "old_price": old_price,
                        "new_price": new_price
                    })

                # Record a price increase if the new price is higher
                elif new_price_float > old_price_float:
                    print(f"PRICE INCREASE: {product}: {old_price} -> {new_price}")
                    logging.info(f"PRICE INCREASE: {product}: {old_price} -> {new_price}")
                    changes_found = True

                    comparison_result["increases"].append({
                        "product_name": product,
                        "old_price": old_price,
                        "new_price": new_price
                    })

        if not changes_found:
            print("No price changes found")
            logging.info("No price changes found")

    except FileNotFoundError:
        # Skip comparison if one of the CSV files is missing
        print("Old or new CSV file not found")
        logging.warning("Comparison skipped - file missing")

    except Exception as e:
        print("Error during comparison:", e)
        logging.error(f"Comparison error: {e}")

    # Return structured comparison results for use in main.py
    return comparison_result