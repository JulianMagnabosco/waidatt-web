from webapi.models import ImageProduct, Product
from rest_framework import serializers

class ImageProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageProduct
        fields = ['id', 'image', 'image_order']

class ProductSerializer(serializers.ModelSerializer):
    images = ImageProductSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']