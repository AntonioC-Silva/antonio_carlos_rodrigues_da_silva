import django_filters as df
from .models import Responsaveis, Locals, Ambientes, Sensores, Historico

class ResponsaveisFilter(df.FilterSet):
    nome = df.CharFilter(field_name='nome', lookup_expr='icontains')

    class Meta:
        model = Responsaveis
        fields = ['id', 'nome']

class LocaisFilter(df.FilterSet):
    local = df.CharFilter(field_name='local', lookup_expr='icontains')

    class Meta:
        model = Locals
        fields = ['id', 'local']

class AmbientesFilter(df.FilterSet):
    descricao = df.CharFilter(field_name='descricao', lookup_expr='icontains')

    class Meta:
        model = Ambientes
        fields = ['id', 'local', 'responsavel', 'descricao']

class SensoresFilter(df.FilterSet):
    status = df.BooleanFilter(field_name='status')
    tipo = df.ChoiceFilter(field_name='tipo', choices=Sensores.Sensor.choices)
    local_id = df.NumberFilter(field_name='ambiente__local', label='Filtrar por ID do Local')
    local_nome = df.CharFilter(field_name='ambiente__local__local', lookup_expr='icontains', label='Filtrar por Nome do Local')

    class Meta:
        model = Sensores
        fields = ['id', 'ambiente', 'tipo', 'status', 'mac_address']

class HistoricoFilter(df.FilterSet):
    data_inicio = df.DateTimeFilter(field_name='timestamp', lookup_expr='gte', label='A partir de (Data/Hora)')
    data_fim = df.DateTimeFilter(field_name='timestamp', lookup_expr='lte', label='Até (Data/Hora)')
    
    class Meta:
        model = Historico
        fields = ['sensor', 'timestamp']