import csv
import logging


def compare_prices():
    logging.info("Starting price comparison")

    old_file = "data/processed/lidl_prices_old.csv"
    new_file = "data/processed/lidl_prices.csv"

    old_prices = {}
    new_prices = {}

    comparison_result = {
        "drops": [],
        "increases": []
    }

    try:
        with open(old_file, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                old_prices[row["product_name"]] = row["normal_price"]

        with open(new_file, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                new_prices[row["product_name"]] = row["normal_price"]

        print("\nPrice changes:\n")

        changes_found = False

        for product in new_prices:
            if product in old_prices:
                old_price = old_prices[product]
                new_price = new_prices[product]

                old_price_float = float(old_price)
                new_price_float = float(new_price)

                if new_price_float < old_price_float:
                    print(f"PRICE DROP: {product}: {old_price} -> {new_price}")
                    logging.info(f"PRICE DROP: {product}: {old_price} -> {new_price}")
                    changes_found = True

                    comparison_result["drops"].append({
                        "product_name": product,
                        "old_price": old_price,
                        "new_price": new_price
                    })

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
        print("Old or new CSV file not found")
        logging.warning("Comparison skipped - file missing")

    except Exception as e:
        print("Error during comparison:", e)
        logging.error(f"Comparison error: {e}")

    return comparison_result