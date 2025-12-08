import django_filters as df
from .models import Responsaveis, Locals, Ambientes, Sensores, Historico

##### responsaveis ####
class ResponsaveisFilter(df.FilterSet):
    # busca por nome parcial
    nome = df.CharFilter(field_name='nome', lookup_expr='icontains')

    class Meta:
        model = Responsaveis
        fields = ['id', 'nome']

##### locais ####
class LocaisFilter(df.FilterSet):
    # busca por nome do local 
    local = df.CharFilter(field_name='local', lookup_expr='icontains')

    class Meta:
        model = Locals
        fields = ['id', 'local']

##### ambientes ####
class AmbientesFilter(df.FilterSet):
    descricao = df.CharFilter(field_name='descricao', lookup_expr='icontains')
    # filtra pelo texto do nome do responsavel e do local
    responsavel = df.CharFilter(field_name='responsavel__nome', lookup_expr='icontains', label='Responsável')
    local_nome = df.CharFilter(field_name='local__local', lookup_expr='icontains', label='Nome do Local')

    class Meta:
        model = Ambientes
        fields = ['id', 'local', 'responsavel', 'descricao']

##### sensores ####
class SensoresFilter(df.FilterSet):
    status = df.BooleanFilter(field_name='status')
    tipo = df.ChoiceFilter(field_name='tipo', choices=Sensores.Sensor.choices)
    # filtros especificos por id ou nome do local
    local_id = df.NumberFilter(field_name='ambiente__local', label='Filtrar por ID do Local')
    local_nome = df.CharFilter(field_name='ambiente__local__local', lookup_expr='icontains', label='Filtrar por Nome do Local')

    class Meta:
        model = Sensores
        fields = ['id', 'ambiente', 'tipo', 'status', 'mac_address']

##### historico ####
class HistoricoFilter(df.FilterSet):
    # intervalo de datas para consulta
    data_inicio = df.DateTimeFilter(field_name='timestamp', lookup_expr='gte', label='A partir de (Data/Hora)')
    data_fim = df.DateTimeFilter(field_name='timestamp', lookup_expr='lte', label='Até (Data/Hora)')

    # filtro por tipo de sensor e nome do local
    tipo = df.ChoiceFilter(field_name='sensor__tipo', choices=Sensores.Sensor.choices, label='Tipo de Sensor')
    local_nome = df.CharFilter(field_name='sensor__ambiente__local__local', lookup_expr='icontains', label='Local')
    
    class Meta:
        model = Historico
        fields = ['sensor', 'timestamp']