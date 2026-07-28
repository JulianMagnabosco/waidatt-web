from django.shortcuts import render

from webapi.serializers import ProductSerializer,ImageProductSerializer
from webapi.models import Product, ImageProduct
from rest_framework import viewsets, permissions, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related('images')
    # queryset = Product.objects.all()

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Permitir acceso sin autenticación
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['product_type']          # filtro exacto por tipo
    search_fields = ['name','description']           # búsqueda parcial (icontains) por nombre
    ordering_fields = ['name', 'price']  # campos permitidos para ordenar
    ordering = ['-name']               # orden por defecto

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def add_image(self, request, pk=None):
        product = self.get_object()

        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'detail': 'No se envió ninguna image.'}, status=status.HTTP_400_BAD_REQUEST)

        image_order = product.images.count()
        image = ImageProduct.objects.create(product=product, image=image_file, image_order=image_order)
        serializer = ImageProductSerializer(image, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'], url_path='images/(?P<image_id>[^/.]+)')
    def del_image(self, request, pk=None, image_id=None):
        product = self.get_object()
        try:
            image = product.images.get(id=image_id)
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ImageProduct.DoesNotExist:
            return Response({'detail': 'image no encontrada.'}, status=status.HTTP_404_NOT_FOUND)

