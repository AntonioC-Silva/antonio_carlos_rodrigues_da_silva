import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Locals
from django.db import transaction

class Command(BaseCommand):
    def add_arguments(self, parser):
        # define argumentos para personalizacao do comando
        parser.add_argument("--arquivo", default="population/locais.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")

    @transaction.atomic
    def handle(self, *args, **options):
        try:
            # carrega csv ignorando bom
            df = pd.read_csv(options["arquivo"], encoding="utf-8-sig")
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Arquivo não encontrado: {options['arquivo']}"))
            return

        # limpa nome das colunas
        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]

        # remove dados antigos se flag for passada
        if options["truncate"]:
            Locals.objects.all().delete()
            self.stdout.write(self.style.WARNING("Dados antigos apagados."))

        try:
            # garante que a coluna local seja string
            df["local"] = df["local"].astype(str)
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f"Erro no CSV: {e}"))
            return

        # logica de atualizacao
        if options["update"]:
            criados = 0
            atualizados = 0
            for row in df.itertuples(index=False):
                obj, created = Locals.objects.update_or_create(
                    defaults={
                        "local": row.local,
                    },
                )
                if created:
                    criados += 1
                else:
                    atualizados += 1
            self.stdout.write(self.style.SUCCESS(f"Concluído: {criados} criados, {atualizados} atualizados."))
        
        # logica de insercao em massa
        else:
            objs = [
                Locals(
                    local=row.local,
                )
                for row in df.itertuples(index=False)
            ]
            Locals.objects.bulk_create(objs, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f"Concluído! {len(objs)} registros."))