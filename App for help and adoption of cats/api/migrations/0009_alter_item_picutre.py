# Generated by Django 4.1.7 on 2023-04-27 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_carousel_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='picutre',
            field=models.ImageField(blank=True, null=True, upload_to='api/media/item_images'),
        ),
    ]
