from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models.fields import DateField

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Stock 
from .serializers import *
from datetime import datetime
from django.db.models import Q
from django.db.models import Max

@api_view(['GET', 'POST'])
def stocks_list(request):

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        stocks = Stock.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(stocks, 12)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = UserSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/users/?page=' + str(nextPage), 'prevlink': '/api/userss/?page=' + str(previousPage)})

@api_view(['GET', 'PUT', 'DELETE'])
def stocks_detail(request, pk):
    
    try:
        stock = Stock.objects.get(pk=pk)
    except Stock.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StockSerializer(stock,context={'request': request})
        return Response(serializer.data)


@api_view(['GET'])
def top_50(request):
    
    

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        top_50 = Stock.objects.all().order_by('-volume')[:50]

        page = request.GET.get('page', 1)
        paginator = Paginator(top_50, 50)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = UserSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/top_50/?page=' + str(nextPage), 'prevlink': '/api/userss/?page=' + str(previousPage)})

@api_view(['GET'])
def stock_history(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        symbol = request.GET.get('query', '')
        date=request.GET.get('query1', '')

        if date=='':
            stock_history = Stock.objects.filter(symbol = symbol);
        elif symbol=='':
            stock_history = Stock.objects.filter(date = date);
        else:
            stock_history = Stock.objects.filter(Q(symbol = symbol)&Q(date = date));


        page = request.GET.get('page', 1)
        paginator = Paginator(stock_history, 50)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = UserSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/history/?page=' + str(nextPage), 'prevlink': '/api/users/?page=' + str(previousPage)})

@api_view(['GET'])
def top_10(request):
    
    

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        top_50 = Stock.objects.all().order_by('-volume')[:10]

        page = request.GET.get('page', 1)
        paginator = Paginator(top_50, 50)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = UserSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/top_50/?page=' + str(nextPage), 'prevlink': '/api/userss/?page=' + str(previousPage)})
