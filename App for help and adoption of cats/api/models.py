from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    ROLES = (('admin', 'admin'), ('user', 'user'))
    role = models.CharField(max_length=50, choices=ROLES)
    phone_number = models.CharField(max_length=25, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return '%s %s %s %s %s %s %s' % (self.id, self.username, self.phone_number, self.address, self.email, self.verified, self.role)

class Auction(models.Model):
    info = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=False)
    starting = models.DateTimeField()
    ending = models.DateTimeField()

    def __str__(self):
        return '%s %s %s %s' % (self.info, self.active, self.starting, self.ending)

class Item(models.Model):
    picture = models.ImageField(
        default="default.jpg", upload_to="item_images/")
    name = models.CharField(max_length=50, blank=True)
    starting_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    minimum_bid = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    bid_holder = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    auction = models.ForeignKey(
        Auction, on_delete=models.CASCADE, blank=True, null=True)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return '%s %s %s %s %s %s %s' % (self.picture, self.name, self.starting_price, self.minimum_bid, self.bid_holder, self.auction, self.active)


class Carousel(models.Model):
    POSITIONS = (('1', '1'), ('2', '2'), ('3', '3'),
                 ('4', '4'), ('not_set', 'not_set'))
    picture = models.ImageField(
        default="default.jpg", upload_to="carousel_images/")
    text = models.TextField()
    is_link = models.BooleanField()
    link_url = models.TextField(blank=True, null=True)
    position = models.TextField(choices=POSITIONS)

    def __str__(self):
        return '%s %s %s %s %s' % (self.picture, self.text, self.is_link, self.link_url, self.position)


class Veterinarian(models.Model):
    name = models.TextField()
    address = models.TextField()
    working_hours = models.JSONField()
    contact_number = models.TextField()
    iframe = models.TextField()
    opened = models.BooleanField(default=False)

    def __str__(self):
        return '%s %s %s %s %s %s' % (self.name, self.address, self.working_hours, self.contact_number, self.iframe, self.opened)
    
class Cat(models.Model):
    STATUS = (('adopted', 'adopted'),('waiting','waiting'))
    name = models.TextField()
    info = models.TextField(blank=True, null=True)
    picture = models.ImageField(
        default="default.jpg", upload_to="cat_images/")
    status = models.TextField(choices=STATUS)

def __str__(self):
        return '%s %s %s %s' % (self.name, self.info, self.picture, self.status)


class AdoptionRequest(models.Model):
    STATUS = (('pending', 'pending'), ('read','read'))
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    cat = models.ForeignKey(
        Cat, on_delete=models.CASCADE, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    status = models.TextField(choices=STATUS, default="pending")

    def __str__(self):
        return '%s %s %s %s' % (self.user, self.cat, self.message, self.status)


class Donation(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="donations", blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    paypal = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '%s %s %s %s' % (self.user, self.amount, self.paypal, self.date)