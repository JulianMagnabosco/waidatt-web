from rest_framework import routers

from webapi.views import ProductTypeViewSet, ProductViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'product-types', ProductTypeViewSet, basename='product-type')

urlpatterns = router.urls