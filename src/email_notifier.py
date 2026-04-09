import smtplib
from email.mime.text import MIMEText
import logging


def send_email(subject, body):
    sender_email = "sunshine.355ie@gmail.com"
    receiver_email = "sunshine.355ie@gmail.com"
    app_password = "tpoq rpby mgiq awrq"

    try:
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = sender_email
        msg["To"] = receiver_email

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, app_password)
        server.send_message(msg)
        server.quit()

        logging.info("Email sent successfully")

    except Exception as e:
        logging.error(f"Email error: {e}")
        print("Email error:", e)
        
        