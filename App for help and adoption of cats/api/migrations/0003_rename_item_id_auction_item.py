# Generated by Django 4.1.7 on 2023-03-01 12:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_address_user_phone_number_item_auction'),
    ]

    operations = [
        migrations.RenameField(
            model_name='auction',
            old_name='item_id',
            new_name='item',
        ),
    ]
