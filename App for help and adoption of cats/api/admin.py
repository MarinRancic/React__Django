from django.contrib import admin

from .models import User, Item, Auction, Carousel, Veterinarian, Cat, AdoptionRequest, Donation

admin.site.register(User)
admin.site.register(Item)
admin.site.register(Auction)
admin.site.register(Carousel)
admin.site.register(Veterinarian)
admin.site.register(Cat)
admin.site.register(AdoptionRequest)
admin.site.register(Donation)