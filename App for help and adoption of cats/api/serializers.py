from rest_framework import serializers
from .models import User, Item, Auction, Carousel, Veterinarian, Cat, AdoptionRequest, Donation


class UserSerializer(serializers.ModelSerializer):
    has_donation = serializers.SerializerMethodField()
    has_adoption_request = serializers.SerializerMethodField()

    def get_has_donation(self, user):
        return Donation.objects.filter(user=user).exists()
    
    def get_has_adoption_request(self, user):
        return AdoptionRequest.objects.filter(user=user).exists()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number', 'address', 'verified', 'role', 'has_donation', 'has_adoption_request', 'password')


class ItemSerializer(serializers.ModelSerializer):
    bid_holder_username = serializers.SerializerMethodField()
    bid_holder_verified = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('__all__')

    def get_bid_holder_username(self, obj):
        if obj.bid_holder:
            return obj.bid_holder.username
        return None
    
    def get_bid_holder_verified(self, obj):
        if obj.bid_holder:
            return obj.bid_holder.verified
        return None


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ('__all__')


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = ('__all__')


class VeterinarianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veterinarian
        fields = ('__all__')


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = ('__all__')


class AdoptionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdoptionRequest
        fields = ('__all__')


class DonationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Donation
        fields = ['user', 'amount', 'paypal', 'username', 'email', 'date']


class ContactSerializer(serializers.Serializer):
    email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()
