# Generated by Django 4.1.7 on 2023-07-02 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0045_item_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='minimum_bid',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5),
        ),
    ]