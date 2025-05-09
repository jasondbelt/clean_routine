# Generated by Django 5.2 on 2025-04-18 20:24

import room_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room_app', '0003_alter_room_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='image_url',
            field=models.URLField(blank=True, default='https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png', null=True, validators=[room_app.models.validate_image_url]),
        ),
    ]
