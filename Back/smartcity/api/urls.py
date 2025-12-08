from django.urls import path
from .views import *
from rest_framework_simplejwt.views import *

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('responsaveis/', ResponsaveisView.as_view()),
    path('responsaveis/<int:pk>/', ResponsaveisDetailView.as_view()),
    path('locais/', LocalsView.as_view()),
    path('locais/<int:pk>/', LocalsDetailView.as_view()),
    path('ambientes/', AmbientesView.as_view()),
    path('ambientes/<int:pk>/', AmbientesDetailView.as_view()),
    path('sensores/', SensoresView.as_view()),
    path('sensores/<int:pk>/', SensoresDetailView.as_view()),
    path('medicoes/', HistoricoView.as_view()),
    path('medicoes/recentes/', MedicoesRecentesView.as_view()),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]