# Generated by Django 4.1.7 on 2023-06-22 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0042_alter_donation_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='paypal',
            field=models.TextField(blank=True, null=True),
        ),
    ]
