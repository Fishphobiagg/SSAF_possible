from django.db import models

# Create your models here.

class Article(models.Model):
    article_id = models.CharField(max_length=20)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=20)
    content = models.TextField()
    published_date = models.TextField()
    link = models.URLField("Site URL")
    ent_name = models.CharField(max_length=20)
    class Meta:
        unique_together = (('ent_name', 'article_id'))