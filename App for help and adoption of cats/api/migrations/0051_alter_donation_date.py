# Generated by Django 4.2.3 on 2023-07-28 11:36

from datetime import date
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0050_donation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation',
            name='date',
            field=models.DateField(default=date.today),
        ),
    ]