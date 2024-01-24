from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .authentication import BearerAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from . import utils


@api_view(["GET"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def index(request):
    data = utils.get_badge_by_user(request.user)
    return Response(data, status=200)

@api_view(["POST"])
def register(request):    
    badge = utils.create_badge(request.data)
    return Response({"token": badge.user.auth_token.key}, status=201)

@api_view(["DELETE"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    utils.logout_user(request.user)
    return Response({"message": "Sessão finalizada com sucesso"}, status=204)

@api_view(["POST"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def update(request):
    response = utils.create_badge_update_request(request.data, request.user)
    return Response({"message": "Alterações solicitadas"}, status=201)

@api_view(["GET"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_requests(request):
    return Response(utils.get_badge_update_requests(), status=200)

@api_view(["PUT"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_approve(request, id):
    utils.approve_badge_update_request(id, request.user)
    return Response({"message": "Requisição aprovada com sucesso"}, status=204)

@api_view(["PUT"])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_decline(request, id):
    utils.decline_badge_update_request(id)
    return Response({"message": "Requisição negada com sucesso"}, status=204)

