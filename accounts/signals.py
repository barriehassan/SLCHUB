from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, CreatorProfile, AdminProfile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 'creator':
            CreatorProfile.objects.create(user=instance)
        elif instance.user_type == 'admin':
            AdminProfile.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.user_type == 'creator':
        instance.creatorprofile.save()
    elif instance.user_type == 'admin':
        instance.adminprofile.save()

