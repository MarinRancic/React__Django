# Generated by Django 4.1.7 on 2023-04-27 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_carousel_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='picutre',
            field=models.ImageField(default='default.jpg', upload_to='item_images/'),
        ),
    ]