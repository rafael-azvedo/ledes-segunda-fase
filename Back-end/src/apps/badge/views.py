from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .authentication import BearerAuthentication
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.utils import IntegrityError
from . import utils


# @csrf_exempt
@api_view(["GET"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def index(request):
    data = utils.get_badge_by_user(request.user)
    return Response(data, status=200)


# @csrf_exempt
@api_view(["POST"])
def register(request):    
    try:
        badge = utils.create_badge(request.data, request.FILES.get('image'))
    except IntegrityError as err:
        return Response({"message": "Nome de usuário já cadastrado"}, status=400)
    print(f'USUARIO CADASTRADO RETORNANDO : {badge.user.auth_token.key}')
    return Response({"token": badge.user.auth_token.key}, status=201)


# @csrf_exempt
@api_view(["DELETE"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    utils.logout_user(request.user)
    return Response({"message": "Sessão finalizada com sucesso"}, status=204)


# @csrf_exempt
@api_view(["POST"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def update(request):
    message = utils.create_badge_update_request(request.data, request.user)
    return Response({"message": message}, status=201)


# @csrf_exempt
@api_view(["GET"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_requests(request):
    return Response(utils.get_badge_update_requests(), status=200)


# @csrf_exempt
@api_view(["PUT"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_approve(request, id):
    utils.approve_badge_update_request(id, request.user)
    return Response({"message": "Requisição aprovada com sucesso"}, status=204)


# @csrf_exempt
@api_view(["PUT"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_decline(request, id):
    utils.decline_badge_update_request(id)
    return Response({"message": "Requisição negada com sucesso"}, status=204)

