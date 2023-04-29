# Generated by Django 3.2.18 on 2023-04-29 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_email'),
        ('articles', '0004_alter_article_published_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='scrap_users',
            field=models.ManyToManyField(related_name='scrap_articles', to='accounts.User'),
        ),
    ]