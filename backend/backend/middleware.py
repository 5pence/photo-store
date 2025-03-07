from django.utils.deprecation import MiddlewareMixin


class CustomCORSMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # ✅ Dynamically allow only trusted origins
        allowed_origins = [
            "https://spencers.studio",
            "https://photo-store-drab.vercel.app",  # ✅ Include Vercel frontend
        ]

        # Get the actual request's origin
        origin = request.headers.get("Origin")

        if origin in allowed_origins:
            # ✅ Set dynamically
            response["Access-Control-Allow-Origin"] = origin

        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE, PATCH"
        response["Access-Control-Allow-Headers"] = (
            "Authorization, Content-Type, X-Content-Type-Options, Accept, "
            "X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
        )
        response["Access-Control-Allow-Credentials"] = "true"
        # Match Chromium & Firefox limits
        response["Access-Control-Max-Age"] = "7200"

        return response
