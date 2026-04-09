# Lidl Price Monitoring Automation System

## Overview
This project is a **network-enabled automation system** built in Python.  
It collects product prices from Lidl, processes and compares them, integrates currency data from an API, and sends email notifications when changes occur.

The system demonstrates **data collection, processing, storage, and automated notification**.

---

## Features

### Lidl Price Scraping
- Reads saved Lidl HTML file
- Extracts product names and prices using regex
- Stores data in CSV format

### Price Comparison
- Compares current prices with previous run
- Detects:
  - Price drops
  - Price increases

### Currency API Integration
- Uses REST API to fetch EUR → USD exchange rate
- Compares today vs yesterday
- Stores results in JSON

### Email Notifications
- Sends email alerts when price drops occur
- Includes multiple products in a clean format
- Includes currency status

### Logging
- Logs system start/end
- Logs key operations
- Logs errors and warnings

---

## Project Structure
src/
── main.py # Main controller
── extracted_prices.py # Lidl scraping logic
── compare_prices.py # Price comparison logic
── currency_api.py # API integration
── email_notifier.py # Email sending

config/
── lidl.html # Saved Lidl webpage

data/
── processed/
 ── lidl_prices.csv
 ── lidl_prices_old.csv

── raw/
 ── currency_rates.json

logs/
 ── app.log


---

## How It Works

1. Scrapes Lidl HTML file and extracts prices  
2. Saves results into CSV  
3. Compares new prices with previous data  
4. Detects price changes  
5. Fetches currency data from API  
6. Sends email notification if changes occur  
7. Updates previous CSV automatically  

---

## How to Run

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the system
```bash
python3 src/main.py
```
