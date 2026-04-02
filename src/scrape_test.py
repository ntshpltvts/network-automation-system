from bs4 import BeautifulSoup
import re


def main():
    file_path = "config/lidl.html"

    with open(file_path, "r", encoding="utf-8") as file:
        html = file.read()

    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text(separator="\n")

    # Find all price-like numbers
    matches = re.finditer(r"\d+\.\d{2}", text)

    print("Price matches with surrounding text:\n")

    for match in matches:
        start = max(0, match.start() - 80)
        end = min(len(text), match.end() + 80)
        snippet = text[start:end]

        print("-----")
        print(snippet.strip())
        print("-----\n")


if __name__ == "__main__":
    main()