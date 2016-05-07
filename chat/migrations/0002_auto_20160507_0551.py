# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-07 05:51
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatClear',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_cleared', models.DateTimeField(auto_now=True)),
                ('cleared_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='channel',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='chatmessage',
            name='channel',
        ),
        migrations.DeleteModel(
            name='Channel',
        ),
    ]