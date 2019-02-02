#from django.contrib import admin
#from django.urls import include, path
#from rest_framework import routers
#from stocks import views
#router = routers.DefaultRouter()
#router.register(r'users', views.UserViewSet)

#urlpatterns = [
#    path('admin/', admin.site.urls),
#    path('', include(router.urls)),
#    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
#]

from django.contrib import admin
from django.urls import path
from stocks import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/users/$', views.stocks_list),
    url(r'^api/users/(?P<pk>[0-9]+)$', views.stocks_detail),
    url(r'^top_50', views.top_50),
    url(r'^stock_history', views.stock_history),
    url(r'^top_10', views.top_10),

    


]
