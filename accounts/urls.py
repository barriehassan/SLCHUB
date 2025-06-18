from django.urls import path
from .views import RegisterCreatorView, CustomLoginView, CustomLogoutView


urlpatterns = [
    path('register/', RegisterCreatorView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
]




