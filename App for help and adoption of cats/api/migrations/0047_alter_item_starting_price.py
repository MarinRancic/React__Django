# Generated by Django 4.1.7 on 2023-07-02 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_alter_item_minimum_bid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='starting_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5),
        ),
    ]
