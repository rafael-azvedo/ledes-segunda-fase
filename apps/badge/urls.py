from django.urls import path
from rest_framework.authtoken import views as token_views

from . import views

urlpatterns = [
    path(""                                 , views.index                   , name="index"),
    path("register"                         , views.register                , name="register"),
    path("login"                            , token_views.obtain_auth_token , name="login"),
    path("logout"                           , views.logout                  , name="logout"),
    path("update"                           , views.update                  , name="update"),
    path("update/requests"                  , views.update_requests         , name="update_requests"),
    path("update/requests/<int:id>/approve" , views.update_approve          , name="update_approve"),
    path("update/requests/<int:id>/decline" , views.update_decline          , name="update_decline")
]