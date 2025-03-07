import ssl
import os
import dj_database_url
import environ
from pathlib import Path
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
env = environ.Env()
env_path = BASE_DIR / ".env"
if env_path.exists():
    environ.Env.read_env(env_path)
else:
    print("⚠️ WARNING: .env file not found!")


SECRET_KEY = os.getenv("SECRET_KEY", "somerandomkeyfallback")

DEBUG = os.getenv("DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = [
    "photo-store-q0nm.onrender.com",
    "localhost",
    "127.0.0.1",
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'cloudinary_storage',
    "whitenoise.runserver_nostatic",
    'django.contrib.staticfiles',
    # Third-party apps
    'rest_framework',
    'corsheaders',
    'taggit',
    'django_extensions',
    'ckeditor',
    'ckeditor_uploader',
    'cloudinary',
    # Authentication
    'rest_framework_simplejwt',
    # Custom apps
    'accounts',
    'gallery',
    'store',
    'blog',
    'contact',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise ValueError("DATABASE_URL environment variable is not set!")

DATABASES = {
    "default": dj_database_url.config(
        default=database_url,
        conn_max_age=600,
        ssl_require=True,
    )
}

# Stripe
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "staticfiles"),
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "accounts.CustomUser"

CSRF_COOKIE_NAME = "csrftoken"
CSRF_USE_SESSIONS = False  # Ensure CSRF is cookie-based
CSRF_COOKIE_HTTPONLY = False  # Allow frontend to access CSRF token
CSRF_COOKIE_SAMESITE = "Lax"  # Needed for local testing
CSRF_COOKIE_SECURE = False  # Set to True in production with HTTPS

CORS_ALLOW_CREDENTIALS = True  # Ensure Django allows credentials
CORS_ALLOWED_ORIGINS = [
    "https://photo-store-q0nm.onrender.com",
    "https://your-vercel-url.vercel.app",
    "https://spencers.studio"
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "https://photo-store-q0nm.onrender.com",
    "https://your-vercel-url.vercel.app",
    "https://spencers.studio"
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),  # Token lasts 1 day
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),  # Refresh token lasts 7 days
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.getenv("CLOUDINARY_CLOUD_NAME"),
    "API_KEY": os.getenv("CLOUDINARY_API_KEY"),
    "API_SECRET": os.getenv("CLOUDINARY_API_SECRET"),
}

DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"


CKEDITOR_UPLOAD_PATH = "uploads/"

CKEDITOR_CONFIGS = {
    "default": {
        "toolbar": "full",
        "height": 400,
        "width": "100%",
        "extraPlugins": ",".join(
            [
                "uploadimage",  # Enables image uploads
                "image2",       # Advanced image editing
                "embed",        # Enables video embeds
                "autoembed",
                "autogrow",     # Auto-expand editor
                "codesnippet",  # Code formatting
            ]
        ),
        "filebrowserUploadUrl": "/ckeditor/upload/",
        "filebrowserUploadMethod": "form",
        "allowedContent": True,  # Allows all HTML content
        "removePlugins": "resize",  # Prevents unwanted resizing
    }
}

ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')

# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = os.getenv("SENDGRID_API_KEY")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "noreply@spencers.studio")
