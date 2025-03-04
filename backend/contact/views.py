from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer


class ContactSubmissionView(APIView):
    def post(self, request):
        serializer = ContactSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            contact_submission = ContactSubmission.objects.create(
                **serializer.validated_data)
            contact_submission.send_notification_email()
            return Response({"message": "Your message has been received!"},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
