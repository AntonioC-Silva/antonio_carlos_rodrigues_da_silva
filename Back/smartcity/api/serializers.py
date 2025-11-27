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
    class Meta:
        model = Ambientes
        fields = '__all__'

class SensoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensores
        fields = '__all__'

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = '__all__'
