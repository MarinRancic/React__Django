# Generated by Django 4.1.7 on 2023-05-25 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_auction_ending_alter_auction_starting'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='price',
            new_name='minimum_bid',
        ),
        migrations.AddField(
            model_name='item',
            name='starting_price',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
