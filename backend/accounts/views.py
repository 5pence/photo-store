from django.contrib.auth import get_user_model
from django.contrib.auth.views import PasswordResetView
from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import UserSerializer, UserProfileSerializer
from .serializers import ChangePasswordSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            request.user.set_password(
                serializer.validated_data['new_password'])
            request.user.save()
            return Response({'message': 'Password updated successfully'},
                            status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def test_email(request):
    try:
        send_mail(
            "Test Email",
            "Hello, this is a test email from Django.",
            "spencer@spencers.studio",
            ["your-email@example.com"],  # Replace with your email
            fail_silently=False,
        )
        return JsonResponse({"message": "Email sent successfully!"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


class CustomPasswordResetView(PasswordResetView):
    def form_valid(self, form):
        print("🔹 Password reset form was submitted!")  # Debugging print

        # Send a test email directly from this view
        send_mail(
            "Test Password Reset Email",
            "This is a manually triggered email from form_valid().",
            "your-email@example.com",
            ["your-email@example.com"],
            fail_silently=False,
        )

        print("🔹 Email was manually sent in form_valid()!")

        response = super().form_valid(form)  # Call Django's built-in function
        return JsonResponse({"message": "Password reset email sent!"})

    def form_invalid(self, form):
        print("❌ Password reset form is invalid!")
        print("🔍 Received Data:", self.request.POST)
        print("FORM ERRORS: ", form.errors)
        return JsonResponse({"error": "Invalid form submission"}, status=400)
