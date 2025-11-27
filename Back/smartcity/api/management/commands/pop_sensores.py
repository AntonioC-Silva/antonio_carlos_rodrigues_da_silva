import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Sensores 
from django.db import transaction

class Command(BaseCommand):
    def add_arguments(self, p):
        p.add_argument("--arquivo", default="population/sensores.csv")
        p.add_argument("--truncate", action="store_true")
        p.add_argument("--update", action="store_true")

    @transaction.atomic
    def handle(self, *a, **o):
            df = pd.read_csv(o["arquivo"], encoding="utf-8-sig")
            df.columns = [c.strip().lower().lstrip("\ufeff")for c in df.columns]

            if o["truncate"]: Sensores.objects.all().delete()
            df["tipo"] = df["sensor"].astype(str)
            df["mac_address"] = df["mac_address"].astype(str)
            df["unidade_med"] = df["unidade_medida"].astype(str)
            df["latitude"] = df["latitude"].astype(float)
            df["longitude"] = df["longitude"].astype(float)
            df["status"] = df["status"].astype(bool)
            df["ambiente"] = df["ambiente"].astype(int)

            if o["update"]:
                criados = atualizados = 0
                for r in df.itertuples(index=False):
                    obj, criado = Sensores.objects.update_or_create(
                        id=r.id,
                        defaults={
                            "tipo": r.tipo,
                            "mac_address": r.mac_address,
                            "unidade_med": r.unidade_med,
                            "latitude": r.latitude,
                            "longitude": r.longitude,
                            "status": r.status,
                            "ambiente_id": r.ambiente,
                        },
                    )
                    if criado:
                        criados += 1
                    else:
                        atualizados += 1
                self.stdout.write(self.style.SUCCESS(f"Criados: {criados} | Atualizados: {atualizados}"))
            else:
                objs = [
                    Sensores(
                        tipo=r.tipo,
                        mac_address=r.mac_address,
                        unidade_med=r.unidade_med,
                        latitude=r.latitude,
                        longitude=r.longitude,
                        status=r.status,
                        ambiente_id=r.ambiente,
                    )
                    for r in df.itertuples(index=False)
                ]
                Sensores.objects.bulk_create(objs, ignore_conflicts=True)
                self.stdout.write(self.style.SUCCESS(f"Criados: {len(objs)}"))
               