import uuid

from django.db import models

# Create your models here.

class Product(models.Model):

    name = models.CharField(max_length=100)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=True)

    description = models.TextField(blank=True)
    product_type = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

def product_image_path(instance, filename):
    """Genera la ruta donde se guardará cada imagen subida."""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return f'products/{instance.product.id or "tmp"}/{filename}'
class ImageProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=product_image_path)
    image_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['image_order']

    def __str__(self):
        return f'Image of {self.product.name}'