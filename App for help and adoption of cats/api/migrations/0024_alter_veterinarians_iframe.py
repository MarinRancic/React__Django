# Generated by Django 4.1.7 on 2023-04-30 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_veterinarians'),
    ]

    operations = [
        migrations.AlterField(
            model_name='veterinarians',
            name='iframe',
            field=models.TextField(),
        ),
    ]