from django.contrib import admin
from django.urls import path
from api.views import *
from rest_framework_simplejwt.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/responsaveis/', ResponsaveisView.as_view()),
    path('api/responsaveis/<int:pk>/', ResponsaveisDetailView.as_view()),
    path('api/locais/', LocalsView.as_view()),
    path('api/locais/<int:pk>/', LocalsDetailView.as_view()),
    path('api/ambientes/', AmbientesView.as_view()),
    path('api/ambientes/<int:pk>/', AmbientesDetailView.as_view()),
    path('api/sensores/', SensoresView.as_view()),
    path('api/sensores/<int:pk>/', SensoresDetailView.as_view()),
    path('api/medicoes/', HistoricoView.as_view()),
    path('api/medicoes/recentes/', MedicoesRecentesView.as_view()),
   
]