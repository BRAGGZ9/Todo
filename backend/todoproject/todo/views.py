from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
# todoproject/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. This is the index view.")


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

@api_view(['GET'])
def api_home(request):
    data = {
        "message": "Welcome to the API!",
    }
    return Response(data)