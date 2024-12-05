from django.core.mail import EmailMultiAlternatives

def send_email(subject, message, recipient_list, html_message=None):
    email = EmailMultiAlternatives(subject, message, to=recipient_list)
    if html_message:
        email.attach_alternative(html_message, "text/html")
    email.send()


