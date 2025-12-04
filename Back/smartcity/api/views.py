from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .filter import *
from datetime import timedelta
from django.utils import timezone
from rest_framework import serializers

class ResponsaveisView(ListCreateAPIView):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaeveisSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['nome']
    filterset_class = ResponsaveisFilter

class ResponsaveisDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaeveisSerializer
    permission_classes = [IsAuthenticated]

class LocalsView(ListCreateAPIView):
    queryset = Locals.objects.all()
    serializer_class = LocalsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['local']
    filterset_class = LocaisFilter

class LocalsDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Locals.objects.all()
    serializer_class = LocalsSerializer
    permission_classes = [IsAuthenticated]

class AmbientesView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['descricao']
    filterset_class = AmbientesFilter

class AmbientesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]

class SensoresView(ListCreateAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['mac_address', 'unidade_med']
    filterset_class = SensoresFilter

class SensoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]

class HistoricoView(ListCreateAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = HistoricoFilter

    def perform_create(self, serializer):
        sensor = serializer.validated_data['sensor']
        if not sensor.status:
             raise serializers.ValidationError("Não é possível registar medições para um sensor inativo.")
        serializer.save()

class MedicoesRecentesView(ListCreateAPIView):
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        hours = int(self.request.query_params.get('hours', 24))
        tempo_limite = timezone.now() - timedelta(hours=hours)
        return Historico.objects.filter(timestamp__gte=tempo_limite)