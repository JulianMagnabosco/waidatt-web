from django.shortcuts import render

from webapi.serializers import ProductSerializer, ProductTypeSerializer
from webapi.models import Product, ProductType
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Create your views here.

class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Permitir acceso sin autenticación
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Permitir acceso sin autenticación
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['product_type']          # filtro exacto por tipo
    search_fields = ['name','description']           # búsqueda parcial (icontains) por nombre
    ordering_fields = ['name', 'price']  # campos permitidos para ordenar
    ordering = ['-name']               # orden por defecto

