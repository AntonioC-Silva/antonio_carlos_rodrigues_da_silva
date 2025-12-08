from rest_framework import serializers
from .models import Responsaveis, Locals, Ambientes, Sensores, Historico

class ResponsaeveisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsaveis
        fields = "__all__"

class LocalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locals
        fields = '__all__'

class AmbientesSerializer(serializers.ModelSerializer):
    # pega o nome do local e do responsável em vez de pegar o id
    nome_local = serializers.CharField(source='local.local', read_only=True)
    nome_responsavel = serializers.CharField(source='responsavel.nome', read_only=True)

    class Meta:
        model = Ambientes
        fields = '__all__'

class SensoresSerializer(serializers.ModelSerializer):
    # pega o nome do local do ambiente
    nome_local = serializers.CharField(source='ambiente.local.local', read_only=True)
    # pega o texto e não id
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Sensores
        fields = '__all__'

class HistoricoSerializer(serializers.ModelSerializer):
    # Busca dados do sensor relacionado para exibir na tabela
    tipo_sensor = serializers.CharField(source='sensor.get_tipo_display', read_only=True)
    local_sensor = serializers.CharField(source='sensor.ambiente.local.local', read_only=True)
    unidade_sensor = serializers.CharField(source='sensor.unidade_med', read_only=True)

    class Meta:
        model = Historico
        fields = '__all__'