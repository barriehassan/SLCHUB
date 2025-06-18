from django import forms
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm, SetPasswordForm
from .models import CustomUser, CreatorProfile, AdminProfile
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError


class RegisterCreatorForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password1', 'password2', 'ID_Picture')
        labels = {
            'username': 'Username',
            'email': 'Email',
            'password1': 'Password1',
            'password2': 'Password2',
            'ID_Picture': 'ID Picture',
        }

        widgets = {
            'username': forms.TextInput(attrs={
                'class': 'form-control'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control'
            }),
            'password1': forms.PasswordInput(attrs={
                'class': 'form-control'
            }),
            'password2': forms.PasswordInput(attrs={
                'class': 'form-control'
            }),
            'ID_Picture': forms.FileInput(attrs={
                'class': 'form-control'
            }),
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.user_type = 'creator'
        user.is_active = False
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


class CustomLoginForm(forms.Form):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'placeholder': 'Enter Email',
            'class': 'form-control',
            'required': True,
        }),
        label="Email",
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Enter Password',
            'class': 'form-control',
            'required': True,
        }),
        label="Password",
    )

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        password = cleaned_data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user is None:
                raise ValidationError("Invalid email or password.")
            if not user.is_active:
                raise ValidationError("User account is disabled.")
            self.user = user
        return cleaned_data

    def get_user(self):
        return getattr(self, 'user', None)


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'last_name', 'email', 'passport_number', 'ID_Picture'
        ]
        widgets = {
            'ID_Picture': forms.ClearableFileInput(),
        }

class CreatorProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = CreatorProfile
        fields = [
            'profile_picture', 'phone', 'address', 'DOB',
            'media', 'bio', 'website', 'category'
        ]
        widgets = {
            'DOB': forms.DateInput(attrs={'type': 'date'}),
        }


class AdminProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = AdminProfile
        fields = [
            'profile_picture', 'phone', 'address', 'DOB',
            'role'
        ]
        widgets = {
            'DOB': forms.DateInput(attrs={'type': 'date'}),
        }

