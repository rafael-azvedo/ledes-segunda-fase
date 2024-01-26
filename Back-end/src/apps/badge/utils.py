from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Badge, BadgeUpdateRequest
from .serializers import BadgeSerializer, BadgeUpdateRequestSerializer
from django.utils import timezone
from os import path
from core.settings import STATIC_URL
from uuid import uuid4



def logout_user(user):
    user.auth_token.delete()

def normalize_file_name(file_name):
    name, extention = file_name.split('.')
    return f'{uuid4()}.{extention}'

def save_image_file(file):
    image_path = path.join(STATIC_URL, normalize_file_name(file.__str__()))

    with open(image_path, 'wb') as image_file:
        image_file.write(file.file.read())

    return image_path    

def create_badge(data, file=None):
    user = User.objects.create_user(
        username   = data['username'],
        password   = data['password'],
        first_name = data['first_name'],
        last_name  = data['last_name'],
        email      = data['email']
    )
    token = Token.objects.create(user=user)

    badge = Badge.objects.create(
        user = user,
        role = data['role']
    )

    if file:
        badge.image_path = save_image_file(file)
        badge.save()

    return badge

def get_badge_by_user(user):
    return BadgeSerializer(user.badge).data

def update_password(password, user):
    update_request = BadgeUpdateRequest.objects.create(
            badge         = user.badge,
            field         = "password",
            old_value     = user.password,
            authorized    = True,
            authorized_at = timezone.now()
        ) 

    user.set_password(password)
    user.save()

    update_request.new_value = user.password
    update_request.save()

def decline_badge_update_request(id):
    update_request        = BadgeUpdateRequest.objects.get(pk=id)
    update_request.active = False
    update_request.save()

def set_authorized_by(update_request, user):
    update_request.authorized    = True
    update_request.authorized_at = timezone.now()
    update_request.authorized_by = user
    update_request.save()

def approve_badge_update_request(id, user):
    update_request = BadgeUpdateRequest.objects.get(pk=id)
    badge          = Badge.objects.get(pk=update_request.badge.id)


    if update_request.field in vars(badge).keys():
        setattr(badge, update_request.field, update_request.new_value)
        badge.save()
    else:
        setattr(badge.user, update_request.field, update_request.new_value)
        badge.user.save() 
    
    set_authorized_by(update_request, user)

def create_badge_update_request(data, user):
    for field, value in data.items():

        if field == 'password':
            update_password(value, user)

            return "Senha atualizada"


        update_request = BadgeUpdateRequest.objects.create(
            badge     = user.badge,
            field     = field,
            old_value = getattr(user.badge, field) if field in vars(user.badge).keys() else getattr(user, field),
            new_value = value
        )

        if user.is_staff:
            approve_badge_update_request(update_request.id, user)
        

        return "Alterações realizadas" if user.is_staff else "Alterações solicitadas"

def get_badge_update_requests():
    return BadgeUpdateRequestSerializer(BadgeUpdateRequest.objects.filter(authorized=False, active=True), many=True).data



    
