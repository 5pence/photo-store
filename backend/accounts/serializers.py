from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.core.mail import send_mail
from rest_framework.serializers import ModelSerializer, CharField, EmailField
from rest_framework.serializers import ValidationError
import re

# Ensure we're using the correct user model
User = get_user_model()


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user


class UserProfileSerializer(ModelSerializer):
    email = EmailField(required=True)
    current_password = CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name',
                  'last_name', 'current_password']
        read_only_fields = ["username"]

    def validate_email(self, value):
        """Ensure email has a valid format"""
        email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(email_regex, value):
            raise ValidationError("Invalid email format.")
        return value

    def validate(self, data):
        """Ensure password matches before changing email"""
        user = self.context['request'].user
        if 'current_password' not in data:
            raise ValidationError(
                {"current_password": "This field is required."})
        if not check_password(data['current_password'], user.password):
            raise ValidationError({"current_password": "Incorrect password."})
        return data

    def update(self, instance, validated_data):
        old_email = instance.email
        new_email = validated_data.get('email')

        # Only update if the email is different
        if old_email != new_email:
            instance.email = new_email
            instance.save()

            # Send notification to OLD email
            send_mail(
                "Email Change Notification",
                f"Your email was changed to {new_email}. If this wasn't you, contact support.",
                "support@spencers.studio",
                [old_email],
                fail_silently=True,
            )

        return instance


class ChangePasswordSerializer(ModelSerializer):
    old_password = CharField(write_only=True, required=True)
    new_password = CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['old_password', 'new_password']

    def validate(self, data):
        user = self.context['request'].user
        if not check_password(data['old_password'], user.password):
            raise ValidationError({'old_password': 'Incorrect password'})
        return data
