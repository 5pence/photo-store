from django.utils.deprecation import MiddlewareMixin


class CustomCORSMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # ✅ Change to your frontend
        response["Access-Control-Allow-Origin"] = "https://spencers.studio"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE, PATCH"
        response["Access-Control-Allow-Headers"] = (
            "Authorization, Content-Type, X-Content-Type-Options, Accept, "
            "X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
        )
        response["Access-Control-Allow-Credentials"] = "true"
        # Match Chromium & Firefox limits
        response["Access-Control-Max-Age"] = "7200"
        return response
