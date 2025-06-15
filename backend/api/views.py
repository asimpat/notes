from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

class CreateUser(generics.CreateAPIView):
    # Connection Auth routes
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# creating new note
class CreateNote(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # to get the notes writen be just a particular user
    def get_queryset(self):
        # this specifies the user so that one can get the note for that particular user
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            return serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


# delete a note
class DeleteNote(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # this specifies the user so that one can get the note for that particular user
        user = self.request.user
        return Note.objects.filter(author=user)

