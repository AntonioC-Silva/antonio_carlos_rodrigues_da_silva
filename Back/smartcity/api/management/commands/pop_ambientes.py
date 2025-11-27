import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Ambientes
from django.db import transaction

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("--arquivo", default="population/ambientes.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")

    @transaction.atomic
    def handle(self, *args, **options):
        try:
            df = pd.read_csv(options["arquivo"], encoding="utf-8-sig")
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Arquivo não encontrado: {options['arquivo']}"))
            return

        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]

        if options["truncate"]:
            Ambientes.objects.all().delete()
            self.stdout.write(self.style.WARNING("Dados antigos apagados."))

        try:
            df["descricao"] = df["descricao"].astype(str)
            df["local_id"] = df["local"].astype(int)
            df["responsavel_id"] = df["responsavel"].astype(int)
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f"Erro no CSV: {e}"))
            return

        if options["update"]:
            criados = 0
            atualizados = 0
            for row in df.itertuples(index=False):
                obj, created = Ambientes.objects.update_or_create(
                    defaults={
                        "descricao": row.descricao,
                        "local_id": row.local_id,
                        "responsavel_id": row.responsavel_id,
                    },
                )
                if created:
                    criados += 1
                else:
                    atualizados += 1
            self.stdout.write(self.style.SUCCESS(f"Concluído: {criados} criados, {atualizados} atualizados."))
        
        else:
            objs = [
                Ambientes(
                    descricao=row.descricao,
                    local_id=row.local_id,
                    responsavel_id=row.responsavel_id,
                )
                for row in df.itertuples(index=False)
            ]
            Ambientes.objects.bulk_create(objs, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f"Concluído! {len(objs)} registros."))