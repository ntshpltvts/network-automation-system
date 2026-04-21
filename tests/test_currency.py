import logging
import os
from currency_api import get_eur_usd_status


def main():
    os.makedirs("logs", exist_ok=True)

    logging.basicConfig(
        filename="logs/app.log",
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s"
    )

    result = get_eur_usd_status()

    print("Currency result:")
    print(result)


if __name__ == "__main__":
    main()