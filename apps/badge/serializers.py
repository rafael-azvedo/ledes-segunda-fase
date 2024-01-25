from rest_framework import serializers
from .models import Badge, BadgeUpdateRequest

class BadgeSerializer(serializers.ModelSerializer):
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name  = serializers.ReadOnlyField(source='user.last_name')
    username   = serializers.ReadOnlyField(source='user.username')
    email      = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = Badge
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'role', 'image_path']

class BadgeUpdateRequestSerializer(serializers.ModelSerializer):
    badge_id   = serializers.ReadOnlyField(source='badge.id')
    
    class Meta:
        model = BadgeUpdateRequest
        fields = ['id', 'badge_id', 'field', 'new_value', 'old_value', 'requested_at']