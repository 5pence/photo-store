from django.db import models
from django.core.mail import send_mail
from django.conf import settings


class ContactSubmission(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

    def send_notification_email(self):
        subject = "New Contact Form Submission"
        message = f"You have a new contact form submission:\n\n"
        message += f"Name: {self.name}\n"
        message += f"Email: {self.email}\n"
        if self.phone:
            message += f"Phone: {self.phone}\n"
        message += f"Message:\n{self.message}"

        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,
                  [settings.ADMIN_EMAIL])
