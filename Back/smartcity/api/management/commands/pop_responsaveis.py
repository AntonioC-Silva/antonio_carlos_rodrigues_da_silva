import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Responsaveis
from django.db import transaction

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("--arquivo", default="population/nomes.csv")
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
            Responsaveis.objects.all().delete()
            self.stdout.write(self.style.WARNING("Dados antigos apagados."))

        try:
            df["nome"] = df["nome"].astype(str)
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f"Erro no CSV: {e}"))
            return

        if options["update"]:
            criados = 0
            atualizados = 0
            for row in df.itertuples(index=False):
                obj, created = Responsaveis.objects.update_or_create(
                    defaults={
                        "nome": row.nome,
                    },
                )
                if created:
                    criados += 1
                else:
                    atualizados += 1
            self.stdout.write(self.style.SUCCESS(f"Concluído: {criados} criados, {atualizados} atualizados."))
        
        else:
            objs = [
                Responsaveis(
                    nome=row.nome,
                )
                for row in df.itertuples(index=False)
            ]
            Responsaveis.objects.bulk_create(objs, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f"Concluído! {len(objs)} registros."))