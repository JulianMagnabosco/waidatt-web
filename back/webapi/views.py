from django.shortcuts import render

from webapi.serializers import ProductSerializer, ProductTypeSerializer
from webapi.models import Product, ProductType
from rest_framework import viewsets, permissions

# Create your views here.

class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Permitir acceso sin autenticación
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Permitir acceso sin autenticación
