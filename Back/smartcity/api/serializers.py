from rest_framework import serializers
from .models import Responsaveis, Locals, Ambientes, Sensores, Historico

##### responsaveis ####
class ResponsaeveisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsaveis
        fields = "__all__"

##### locais ####
class LocalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locals
        fields = '__all__'

##### ambientes ####
class AmbientesSerializer(serializers.ModelSerializer):
    # traz nome do local e responsavel ao inves de id
    nome_local = serializers.CharField(source='local.local', read_only=True)
    nome_responsavel = serializers.CharField(source='responsavel.nome', read_only=True)

    class Meta:
        model = Ambientes
        fields = '__all__'

##### sensores ####
class SensoresSerializer(serializers.ModelSerializer):
    # busca local atraves da relacao com ambiente
    nome_local = serializers.CharField(source='ambiente.local.local', read_only=True)
    # converte o choice do tipo para texto
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Sensores
        fields = '__all__'

##### historico ####
class HistoricoSerializer(serializers.ModelSerializer):
    # campos extras para facilitar exibicao no front
    tipo_sensor = serializers.CharField(source='sensor.get_tipo_display', read_only=True)
    local_sensor = serializers.CharField(source='sensor.ambiente.local.local', read_only=True)
    unidade_sensor = serializers.CharField(source='sensor.unidade_med', read_only=True)

    class Meta:
        model = Historico
        fields = '__all__'