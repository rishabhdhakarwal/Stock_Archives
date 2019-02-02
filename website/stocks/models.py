from django.db import models
from datetime import datetime


class Stock(models.Model):

    date = models.TextField(blank=True, null=True)
    symbol = models.TextField(blank=True, null=True)
    open1 = models.TextField(blank=True, null=True)  # This field type is a guess.
    close = models.TextField(blank=True, null=True)  # This field type is a guess.
    low = models.TextField(blank=True, null=True)  # This field type is a guess.
    high = models.TextField(blank=True, null=True)  # This field type is a guess.
    volume = models.IntegerField(blank=True, null=True) 
    id = models.IntegerField(db_column='ID', primary_key=True)

    class Meta:
        managed = False
        db_table = 'stocks_table'

    
