# Generated by Django 4.1.7 on 2023-05-24 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_alter_auction_ending_alter_auction_starting'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auction',
            name='ending',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='auction',
            name='starting',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
