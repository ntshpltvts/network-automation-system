import smtplib
from email.mime.text import MIMEText
import logging


def send_email(subject, body):
    # Email account configuration
    sender_email = "sunshine.355ie@gmail.com"
    receiver_email = "sunshine.355ie@gmail.com"
    app_password = "xdrk qngj ztjy utaf"

    try:
        # Create a plain text email message
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = sender_email
        msg["To"] = receiver_email

        # Connect to Gmail's SMTP server
        server = smtplib.SMTP("smtp.gmail.com", 587)

        # Upgrade the connection to a secure encrypted session
        server.starttls()

        # Authenticate using an app password
        server.login(sender_email, app_password)

        # Send the email and close the connection
        server.send_message(msg)
        server.quit()

        logging.info("Email sent successfully")

    except Exception as e:
        logging.error(f"Email error: {e}")
        print("Email error:", e)