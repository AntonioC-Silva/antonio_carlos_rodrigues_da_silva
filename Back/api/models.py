from django.db import models

# Create your models here.



class Responsaveis(models.Model):
    nome = models.CharField(max_length=50)

class Locals(models.Model):
    local = models.CharField(max_length=100)


class Ambientes(models.Model):
    local = models.ForeignKey(Locals, verbose_name=("Local"), on_delete=models.CASCADE)
    descricao = models.TextField()
    responsavel = models.ForeignKey(Responsaveis, verbose_name=("responsavel"),on_delete=models.CASCADE)

class Sensores(models.Model):
    class Sensor(models.TextChoices):
        Temperatura = '1', 'Temperatura'
        Umidade = '2', 'Umidade'
        Luminosidade = '3', 'Luminosidade'
        Contador = '4', 'Contador'
    mac_address = models.CharField(max_length=17)
    unidade_med = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=True)
    ambiente = models.ForeignKey(Ambientes, verbose_nome=("Ambiente"), on_delete=models.CASCADE)

class Historico(models.Model):
    sensor = models.ForeignKey(Sensores, verbose_name=("Sensor"), on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

