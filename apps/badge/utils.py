from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Badge, BadgeUpdateRequest
from .serializers import BadgeSerializer, BadgeUpdateRequestSerializer
from django.utils import timezone



def logout_user(user):
    print(request.user.auth_token.delete())

def create_badge(data):
    user = User.objects.create_user(
        username   = data['username'],
        password   = data['password'],
        first_name = data['first_name'],
        last_name  = data['last_name'],
        email      = data['email']
    )

    token = Token.objects.create(user=user)

    return Badge.objects.create(
        user = user,
        role = data['role']
    )

def get_badge_by_user(user):
    return BadgeSerializer(user.badge).data

def create_badge_update_request(data, user):
    for field, value in data.items():
        BadgeUpdateRequest.objects.create(
            badge     = user.badge,
            field     = field,
            old_value = getattr(user.badge, field) if field in vars(user.badge).keys() else getattr(user, field),
            new_value = value
        )

def get_badge_update_requests():
    return BadgeUpdateRequestSerializer(BadgeUpdateRequest.objects.filter(authorized=False, active=True), many=True).data

def decline_badge_update_request(id):
    update_request        = BadgeUpdateRequest.objects.get(pk=id)
    update_request.active = False
    update_request.save()

def approve_badge_update_request(id, user):
    update_request = BadgeUpdateRequest.objects.get(pk=id)
    badge          = Badge.objects.get(pk=id)

    print(badge)
    print(badge.user.first_name)

    if update_request.field in vars(badge).keys():
        setattr(badge, update_request.field, update_request.new_value)
        badge.save()
    else:
        setattr(badge.user, update_request.field, update_request.new_value)
        badge.user.save()
    
    print(badge)
    print(badge.user.first_name)

    update_request.authorized    = True
    update_request.authorized_at = timezone.now()
    update_request.authorized_by = user
    update_request.save()
