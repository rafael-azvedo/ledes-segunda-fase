from django.db import models
from django.contrib.auth.models import User

class Badge(models.Model):
    user           = models.OneToOneField(User, models.CASCADE)
    image_path     = models.CharField(max_length=400, blank=True, null=True)
    role           = models.CharField(max_length=100, blank=True, null=True)
    create_at      = models.DateTimeField(auto_now=True)
    update_at      = models.DateTimeField(auto_now_add=True)
    record_version = models.IntegerField(default=1, blank=True)

    class Meta:
        db_table = "dadge"

class BadgeUpdateRequest(models.Model):
    badge         = models.ForeignKey(Badge, models.CASCADE)
    field         = models.CharField(max_length=200)
    new_value     = models.CharField(max_length=400)
    old_value     = models.CharField(max_length=400)
    authorized    = models.BooleanField(default=False)
    requested_at  = models.DateTimeField(auto_now=True)
    authorized_at = models.DateTimeField(null=True)
    authorized_by = models.ForeignKey(User, models.DO_NOTHING, null=True)
    active        = models.BooleanField(default=True)

    class Meta:
        db_table = "badge_update_request"


