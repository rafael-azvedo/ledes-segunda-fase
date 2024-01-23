from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('badge/v1/api', include('apps.badge.urls')),
]
