# Generated by Django 4.1.7 on 2023-04-25 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_carousel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carousel',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='./media'),
        ),
    ]
