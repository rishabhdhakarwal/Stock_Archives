
from rest_framework import serializers
from .models import Stock

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock 
        fields = ('date', 'symbol', 'open1', 'close', 'low', 'high', 'volume')

