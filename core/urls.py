from django.urls import path
from .views import HomePageView, AboutPageView, ContactPageView


app_name = 'core'


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('about/', AboutPageView.as_view(), name='about'),
    path('contact/', ContactPageView.as_view(), name='contact'),
]






