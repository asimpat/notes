from django.urls import path, include
from . import views

urlpatterns = [
    # viewing or creating notes
    path('notes/', views.CreateNote.as_view(), name='list_notes'),
    path('notes/delete/<int:pk>/', views.DeleteNote.as_view(), name='delete')
  
]
