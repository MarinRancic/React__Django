from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ItemSerializer, CarouselSerializer, VeterinarianSerializer, ContactSerializer, AuctionSerializer, CatSerializer, AdoptionRequestSerializer, DonationSerializer
from .models import User, Item, Carousel, Veterinarian, Auction, Cat, AdoptionRequest, Donation
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password, check_password
from django.core.paginator import Paginator
from datetime import datetime
from django.db.models import Q, F
from django.db.models import Sum, Count
from django.core.mail import send_mail
import uuid


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['role'] = user.role
        token['email'] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def index(request):
    return render(request, 'index.html')


@api_view(['GET', 'POST'])
def users(request):
    if request.method == "POST":
        username = request.data['username']
        email = request.data['email']
        request.data["password"] = make_password(request.data["password"])
        if User.objects.filter(username=username):
            return Response(data="username_error", status=409)
        elif User.objects.filter(email=email):
            return (Response(data="email_error", status=409))

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data.get("id"), status=201)
        return Response(serializer.errors, status=400)
    else:
        users = User.objects.all()
        if request.GET.get("text"):
            text = request.GET.get("text")
            users = users.filter(Q(username__icontains=text) | Q(email__icontains=text) | Q(address__icontains=text) | Q(phone_number__icontains=text))
        itemCount = len(users)
        page = request.GET.get("page")
        carousel_paginated = Paginator(users, 10)
        pageItems = carousel_paginated.get_page(page)
        serializer = UserSerializer(pageItems, many=True)
        return Response({"itemList": serializer.data, "itemCount": itemCount})


@api_view(['PUT', 'DELETE', 'GET'])
def userDetails(request, id):
    if request.method == "PUT":
        username = request.data['username']
        email = request.data['email']
        user = User.objects.get(id=id)
        request_data = request.data.copy()
        if not request.data.get('password') or request.data.get("password") == "":
            request_data['password'] = user.password
        else:
            request_data['password'] = make_password(request.data['password'])

        if User.objects.filter(username=username) and not user.username == username:
            return Response("Username already exists!", status=409)
        elif User.objects.filter(email=email) and not user.email == email:
            return (Response("Email already exists!", status=409))
        if request_data.get("password_verify"):
            if not check_password(request_data["password_verify"], user.password):
                return Response("Passwords didn't match!", status=409)
            request_data.pop("password_verify")
        serializer = UserSerializer(user, data=request_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response("Success!", status=201)
        return Response(serializer.errors, status=400)
    if request.method == "DELETE":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        user = User.objects.get(id=id)
        if user:
            user.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)
    if request.method == "GET":
        user = User.objects.get(id=id)
        if user:
            serializer = UserSerializer(user)
            return Response (serializer.data, status=200)
        return Response (serializer.errors, status=400)

@api_view(['POST'])
def passwordReset(request):
    if request.method == "POST":
        user = User.objects.get(email=request.data.get("email"))
        token = str(uuid.uuid4())
        subject = 'Link for password reset'
        message = f'Hi, click the link to reset your password: http://localhost:3000/password_reset/{token}\n\n'
        message += 'If you did not request a password reset, please ignore this message, or message us at zavrsni10zivot@gmail.com'
        email_from = "ranca.skalice@gmail.com"
        email_to = [request.data.get("email")]
        send_mail(subject, message, email_from, email_to,)
        return Response({"user_id": user.id, "token": token}, 200)


@api_view(['PUT'])
def passwordResetConfirm(request, token):
    if request.method == "PUT":
        if request.data.get("token") != token:
            return Response("Wrong credentials!", 400)
        user = User.objects.get(id=request.data["user_id"])
        user.password = make_password(request.data["password"])
        user.save()
        return Response("Success", 200)


@api_view(['GET', 'POST'])
def carouselDetails(request):
    if request.method == "GET":
        if request.GET.get("page"):
            carousel = Carousel.objects.all().order_by("position")
            itemCount = len(carousel)
            page = request.GET.get("page")
            carousel_paginated = Paginator(carousel, 4)
            pageItems = carousel_paginated.get_page(page)
            serializer = CarouselSerializer(pageItems, many=True)
            return Response({"itemList": serializer.data, "itemCount": itemCount})
        else:
            carousel = Carousel.objects.all().exclude(
                position="not_set").order_by("position")
            serializer = CarouselSerializer(carousel, many=True)
            return Response(serializer.data)
    elif request.method == "POST":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        position = request.data.get("position")
        if position != "not_set":
            Carousel.objects.filter(
                position=position).update(position="not_set")
        serializer = CarouselSerializer(data=request.data)
        if serializer.is_valid():
            if request.FILES.get("image"):
                carousel = serializer.save(picture=request.FILES.get("image"))
            else:
                carousel = serializer.save()
            if carousel:
                return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['DELETE', 'PUT'])
def carouselDetailsUpdate(request, id):
    if not request.user.is_staff:
        return Response("Unauthorized", status=401)
    if request.method == "DELETE":
        carousel = Carousel.objects.get(id=id)
        if carousel:
            carousel.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)
    elif request.method == "PUT":
        position = request.data.get("position")
        if position != "not_set":
            carousel = Carousel.objects.get(id=id)
            if carousel:
                temp_position = carousel.position
                Carousel.objects.filter(position=position).update(
                    position=temp_position)
                carousel.position = position
                serializer = CarouselSerializer(carousel, data=request.data)
                if serializer.is_valid() and request.FILES.get("image"):
                    carousel = serializer.save(
                        picture=request.FILES.get("image"))
                else:
                    carousel = serializer.save()
                if carousel:
                    return Response(serializer.data, status=200)
        else:
            carousel = Carousel.objects.get(id=id)
            serializer = CarouselSerializer(carousel, data=request.data)
            if serializer.is_valid():
                if request.FILES.get("image"):
                    carousel = serializer.save(
                        picture=request.FILES.get("image"))
                else:
                    carousel = serializer.save()
                if carousel:
                    return Response(serializer.data, status=200)
        return Response("Something went wrong!", status=500)


@api_view(['GET', 'POST'])
def veterinariansDetails(request):
    if request.method == "GET":
        if request.GET.get("name"):
            veterinarians = Veterinarian.objects.filter(
                name__contains=request.GET.get("name").upper()).order_by("-id")
        else:
            veterinarians = Veterinarian.objects.all().order_by("-id")
        if request.GET.get("page"):
            itemCount = len(veterinarians)
            page = request.GET.get("page")
            carousel_paginated = Paginator(veterinarians, 4)
            pageItems = carousel_paginated.get_page(page)
            serializer = VeterinarianSerializer(pageItems, many=True)
            return Response({"itemList": serializer.data, "itemCount": itemCount})
        else:
            serializer = VeterinarianSerializer(veterinarians, many=True)
            return Response(serializer.data, status=200)
    elif request.method == "POST":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        serializer = VeterinarianSerializer(data=request.data)
        if serializer.is_valid():
            veterinarians = serializer.save()
            if veterinarians:
                return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['DELETE', 'PUT'])
def veterinariansDetailsUpdate(request, id):
    if not request.user.is_staff:
        return Response("Unauthorized", status=401)
    if request.method == "DELETE":
        veterinarians = Veterinarian.objects.get(id=id)
        if veterinarians:
            veterinarians.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)
    elif request.method == "PUT":
        veterinarians = Veterinarian.objects.get(id=id)
        serializer = VeterinarianSerializer(veterinarians, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Item successfully updated!", status=200)
        return Response(serializer.errors, status=500)


@api_view(['GET'])
def auction(request):
    if request.method == "GET":
        try:
            auction = Auction.objects.get(active=True)
            serializer = AuctionSerializer(auction)
            return Response(serializer.data, 200)
        except Auction.DoesNotExist:
            return Response("", 200)


@api_view(['GET', 'POST'])
def auctionDetails(request):
    if request.method == "GET":
        auctions = Auction.objects.all().order_by("starting")
        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data, status=200)
    if request.method == "POST":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            auction = serializer.save()
            if auction:
                return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def auctionArchives(request):
    if request.method == "GET":
        auctions = Auction.objects.filter(ending__lte=datetime.now())
        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data, status=200)


@api_view(['GET', 'DELETE', 'PUT'])
def auctionDetailsUpdate(request, id):
    if request.method == "GET":
        auction = Auction.objects.get(id=id)
        if auction:
            serializer = AuctionSerializer(auction)
            return Response(serializer.data, 200)
        return Response("Something went wrong", 400)
    if request.method == "DELETE":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        auction = Auction.objects.get(id=id)
        if auction:
            auction.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)
    if request.method == "PUT":
        auction = Auction.objects.get(id=id)
        if request.data.get("active"):
            Auction.objects.filter(active=True).update(active=False)
        if auction:
            if not request.user.is_staff:
                return Response("Unauthorized", status=401)
            serializer = AuctionSerializer(auction, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def auctionItemDetails(request):
    if request.method == "GET":
        if request.GET.get("filter"):
            if request.GET.get("filter") == "all":
                items = Item.objects.all().order_by("-id")
            elif request.GET.get("filter") == "inactive":
                items = Item.objects.filter(
                    active=False)
            else:
                items = Item.objects.filter(
                    active=True)
        else:
            item = Item.objects.filter(
                active=True)
        if request.GET.get("name"):
            name = request.GET.get("name")
            items = items.filter(
                name__contains=name).order_by("-id")
        itemCount = len(items)
        page = request.GET.get("page")
        items_paginated = Paginator(items, 4)
        pageItems = items_paginated.get_page(page)
        serializer = ItemSerializer(pageItems, many=True)
        return Response({"itemList": serializer.data, "itemCount": itemCount})

    if request.method == "POST":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            if request.FILES.get("image"):
                item = serializer.save(picture=request.FILES.get("image"))
            else:
                item = serializer.save()
            if item:
                return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def auctionItemDetailsUpdate(request, id):
    if request.method == "GET":
        if request.GET.get("name"):
            items = Item.objects.filter(auction=id).filter(
                name__contains=request.GET.get("name")).order_by("-id")
        else:
            items = Item.objects.filter(auction=id).order_by("-id")
        itemCount = len(items)
        page = request.GET.get("page")
        if request.GET.get("displayItems"):
            display_items = request.GET.get("displayItems")
        else:
            display_items = 4
        items_paginated = Paginator(items, display_items)
        page_items = items_paginated.get_page(page)
        serializer = ItemSerializer(page_items, many=True)
        serializer_data = serializer.data
        for i, item_data in enumerate(serializer_data):
            bid_holder = page_items[i].bid_holder
            if bid_holder is not None:
                item_data["bid_holder_username"] = bid_holder.username
            else:
                item_data["bid_holder_username"] = None

        return Response({"itemList": serializer_data, "itemCount": itemCount})
    if request.method == "DELETE":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        item = Item.objects.get(id=id)
        if item:
            item.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)
    if request.method == "PUT":
        item = Item.objects.get(id=id)
        if item:
            if not request.data.get("bid_holder"):
                if not request.user.is_staff:
                    return Response("Unauthorized", status=401)
            serializer = ItemSerializer(item, data=request.data)
            if serializer.is_valid():
                if request.FILES.get("image"):
                    item = serializer.save(picture=request.FILES.get("image"))
                else:
                    item = serializer.save()
                if item:
                    return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def catList(request):
    if request.method == "GET":
        if request.GET.get("status"):
            status = request.GET.get("status")
            if request.GET.get("name"):
                cats = Cat.objects.filter(status=status).filter(
                    name__contains=request.GET.get("name"))
            else:
                cats = Cat.objects.filter(status=status)
            itemCount = len(cats)
            page = request.GET.get("page")
            items_paginated = Paginator(cats, 8)
            pageItems = items_paginated.get_page(page)
            serializer = CatSerializer(pageItems, many=True)
            return Response({"itemList": serializer.data, "itemCount": itemCount})
        return Response("Something went wrong", status=400)

    if request.method == "POST":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        serializer = CatSerializer(data=request.data)
        if serializer.is_valid():
            if request.FILES.get("image"):
                cat = serializer.save(picture=request.FILES.get("image"))
            else:
                cat = serializer.save()
            if cat:
                return Response(serializer.data, status=200)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def catDetails(request, id):
    if request.method == "GET":
        cat = Cat.objects.get(id=id)
        serializer = CatSerializer(cat)
        return Response(serializer.data, status=200)
    if request.method == "DELETE":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        cat = Cat.objects.get(id=id)
        if cat:
            cat.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)
    if request.method == "PUT":
        if not request.user.is_staff:
            return Response("Unauthorized", status=401)
        cat = Cat.objects.get(id=id)
        if cat:
            serializer = CatSerializer(cat, data=request.data)
            if serializer.is_valid():
                if request.FILES.get("image"):
                    cat = serializer.save(picture=request.FILES.get("image"))
                else:
                    cat = serializer.save()
                if cat:
                    return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def adoptionRequest(request):
    if request.method == "GET":
        if request.GET.get("status"):
            if request.GET.get("status") == "all":
                adoptionRequests = AdoptionRequest.objects.all().order_by("status")
            elif request.GET.get("status") == "read":
                adoptionRequests = AdoptionRequest.objects.filter(
                    status="read")
            else:
                adoptionRequests = AdoptionRequest.objects.filter(
                    status="pending")
        else:
            adoptionRequests = AdoptionRequest.objects.filter(
                status="pending")
        if request.GET.get("cat_name") or request.GET.get("user_email"):
            cat_name = request.GET.get("cat_name")
            user_email = request.GET.get("user_email")
            adoptionRequests = adoptionRequests.filter(
                Q(cat__name__icontains=cat_name) | Q(user__email__icontains=user_email))
        itemCount = len(adoptionRequests)
        page = request.GET.get("page")
        items_paginated = Paginator(adoptionRequests, 10)
        pageItems = items_paginated.get_page(page)
        serializer = AdoptionRequestSerializer(pageItems, many=True)
        users = []
        cats = []
        for adoptionRequest in adoptionRequests:
            users.append(adoptionRequest.user)
            cats.append(adoptionRequest.cat)
        users = UserSerializer(users, many=True)
        cats = CatSerializer(cats, many=True)
        return Response({"itemList": serializer.data, "cats": cats.data, "users": users.data, "itemCount": itemCount}, status=200)

    if request.method == "POST":
        serializer = AdoptionRequestSerializer(data=request.data)
        if serializer.is_valid():
            adoption = serializer.save()
            if adoption:
                return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['PUT', 'DELETE'])
def adoptionRequestDetails(request, id):
    if not request.user.is_staff:
        return Response("Unauthorized", status=401)
    if request.method == "PUT":
        adoptionRequest = AdoptionRequest.objects.get(id=id)
        if adoptionRequest:
            serializer = AdoptionRequestSerializer(
                adoptionRequest, data=request.data)
            if serializer.is_valid():
                adoptionRequest = serializer.save()
                if adoptionRequest:
                    return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    if request.method == "DELETE":
        adoptionRequest = AdoptionRequest.objects.get(id=id)
        if adoptionRequest:
            adoptionRequest.delete()
            return Response("Item successfully deleted!", status=204)
        return Response("Something went wrong!", status=500)


@api_view(['GET', 'POST'])
def donations(request):
    if request.method == "GET":
        if request.GET.get("donors"):
            if request.GET.get("donors") == "top":
                donations = Donation.objects.values('paypal', username=F('user__username'), email=F(
                    'user__email')).annotate(total=Sum("amount"), count=Count("paypal")).order_by('-total')
            else:
                if request.GET.get("year"):
                    yearly_donations = []
                    donations = Donation.objects.filter(date__year = int(request.GET.get("year")))
                    for i in range(12):
                        monthly_donation = donations.filter(date__month=i+1).aggregate(total=Sum('amount'))["total"]
                        if monthly_donation:
                            yearly_donations.append(monthly_donation)
                        else:
                            yearly_donations.append(0)
                    yearly_total = sum(yearly_donations)

                    return Response({"yearly_donations":yearly_donations, "yearly_total":yearly_total}, status=200)
                else:
                    donations = Donation.objects.all().order_by('-id')

        if request.GET.get("user_name") or request.GET.get("paypal_name"):
            user_name = request.GET.get("user_name")
            paypal_name = request.GET.get("paypal_name")
            donations = donations.filter(
                Q(user__username__icontains=user_name) | Q(paypal__icontains=paypal_name))
        itemCount = len(donations)
        page = request.GET.get("page")
        items_paginated = Paginator(donations, 10)
        pageItems = items_paginated.get_page(page)
        if request.GET.get("donors") == "top":
            return Response({"itemList": donations, "itemCount": itemCount}, status=200)
        serializer = DonationSerializer(pageItems, many=True)
        return Response({"itemList": serializer.data, "itemCount": itemCount}, status=200)

    if request.method == "POST":
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            donation = serializer.save()
            if donation:
                user_id = request.data.get("user")
                user_donations = Donation.objects.filter(user_id = user_id)
                total_amount = user_donations.aggregate(total=Sum("amount"))["total"]
                if total_amount >= 1000:
                    user_verified = User.objects.get(id = user_id)
                    if not user_verified.verified:
                        user_verified.verified = True
                        user_verified.save()
                        return Response({"status": "success", "message": "You have became one of our biggest donators, thank you so much for your contribution! Take our verified icon in the future auctions as our little sign of gratitude."}, status = 200)
                return Response({"status": "success", "message":"Thank you so much for your generous donation!"}, status=200)
        return Response({"status": "error", "message":"Soemthing went wrong!"}, status=400)


@api_view(['POST'])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        subject = serializer.validated_data['subject']
        message = serializer.validated_data['message']

        send_mail(
            subject,
            f"Sender's Email: {email}\n\n{message}",
            email,
            ['zavrsni10zivot@gmail.com'],
        )
        return Response({'message': 'Email sent successfully'}, status=200)
    return Response(serializer.errors, status=400)
