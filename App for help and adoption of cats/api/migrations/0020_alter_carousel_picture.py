# Generated by Django 4.1.7 on 2023-04-27 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_carousel_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carousel',
            name='picture',
            field=models.ImageField(default='default.jpg', upload_to='media/'),
        ),
    ]
