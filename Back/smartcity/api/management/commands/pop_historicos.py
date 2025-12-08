import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Historico
from django.db import transaction

class Command(BaseCommand):
    def add_arguments(self, parser):
        # define argumentos do comando
        parser.add_argument("--arquivo", default="population/historico.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")

    @transaction.atomic
    def handle(self, *args, **options):
        try:
            # le o arquivo csv
            df = pd.read_csv(options["arquivo"], encoding="utf-8-sig")
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Arquivo não encontrado: {options['arquivo']}"))
            return

        # padroniza nome das colunas
        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]

        # apaga dados anteriores se solicitado
        if options["truncate"]:
            Historico.objects.all().delete()
            self.stdout.write(self.style.WARNING("Dados antigos apagados."))

        try:
            # ajusta tipos e datas
            df["valor"] = df["valor"].astype(float)
            df["sensor_id"] = df["sensor"].astype(int)
            df["timestamp"] = pd.to_datetime(df["timestamp"])
            
            if "id" in df.columns:
                df["id"] = df["id"].astype(int)

        except KeyError as e:
            self.stdout.write(self.style.ERROR(f"Erro no CSV: {e}"))
            return

        # modo atualizacao linha a linha
        if options["update"]:
            criados = 0
            atualizados = 0
            for row in df.itertuples(index=False):
                obj, created = Historico.objects.update_or_create(
                    id=row.id,
                    defaults={
                        "sensor_id": row.sensor_id,
                        "valor": row.valor,
                        "timestamp": row.timestamp,
                    },
                )
                if created:
                    criados += 1
                else:
                    atualizados += 1
            self.stdout.write(self.style.SUCCESS(f"Concluído: {criados} criados, {atualizados} atualizados."))
        
        # modo insercao em massa
        else:
            objs = [
                Historico(
                    id=row.id,
                    sensor_id=row.sensor_id,
                    valor=row.valor,
                    timestamp=row.timestamp,
                )
                for row in df.itertuples(index=False)
            ]
            Historico.objects.bulk_create(objs, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f"Concluído! {len(objs)} registros."))