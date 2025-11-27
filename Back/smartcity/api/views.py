from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Responsaveis, Locals, Ambientes, Sensores, Historico
from .serializers import ResponsaeveisSerializer, LocalsSerializer, AmbientesSerializer, SensoresSerializer, HistoricoSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .filter import ResponsaveisFilter


################### Responsaveis ###############

class ResponsaveisView(ListCreateAPIView):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaeveisSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields = ['id']
    search_fields = ['nome']
    filterset_class = ResponsaveisFilter

class ResponsaveisDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaeveisSerializer
    permission_classes = [IsAuthenticated]

###############################################


################## Locals ############

class LocalsView(ListCreateAPIView):
    queryset = Locals.objects.all()
    serializer_class = LocalsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields = ['id']
    search_fields = ['local']
    # filterset_class = LocalsFilter

class LocalsDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Locals.objects.all()
    serializer_class = LocalsSerializer
    permission_classes = [IsAuthenticated]

#################################### ambientes ############

class AmbientesView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields = ['id']

class AmbientesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]

#################################### Sensores ############
class SensoresView(ListCreateAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields = ['ambiente', 'tipo', 'status']


class SensoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]

#################################### Historico ############
class HistoricoView(ListCreateAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sensor', 'timestamp']

    def perform_create(self, serializer):
        sensor = serializer.validated_data['sensor']
        if not sensor.status:
             raise serializers.ValidationError("Não é possível registar medições para um sensor inativo.")
        serializer.save()

################################ mediçoes recentes ############
class MedicoesRecentesView(ListCreateAPIView):
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        hours = int(self.request.query_params.get('hours', 24))
        tempo_limite = timezone.now() - timedelta(hours=hours)
        return Historico.objects.filter(timestamp__gte=tempo_limite)


# Create your views here.
