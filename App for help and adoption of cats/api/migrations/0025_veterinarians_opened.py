# Generated by Django 4.1.7 on 2023-04-30 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_veterinarians_iframe'),
    ]

    operations = [
        migrations.AddField(
            model_name='veterinarians',
            name='opened',
            field=models.BooleanField(default=False),
        ),
    ]
