# Generated by Django 4.1.7 on 2023-04-25 18:47

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_carousel_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carousel',
            name='picture',
            field=models.ImageField(default='posts/default.jpg'),
        ),
    ]
