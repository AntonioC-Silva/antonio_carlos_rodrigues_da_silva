import django_filters as df
from django.db.models import Q
from .models import Responsaveis, Locals, Ambientes, Sensores, Historico

class ResponsaveisFilter(df.FilterSet):
    id = df.NumberFilter(field_name='id', lookup_expr='exact')
    nome = df.CharFilter(field_name='nome', lookup_expr='icontains')

    class Meta:
        model = Responsaveis
        fields = ['id', 'nome']