from rest_framework import routers

from webapi.views import  ProductViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = router.urls