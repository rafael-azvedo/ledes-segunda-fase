from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from core import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/badge/', include('apps.badge.urls')),
] + static("static/", document_root=settings.STATIC_URL)
