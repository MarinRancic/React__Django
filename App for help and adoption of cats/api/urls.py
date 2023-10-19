from django.urls import path
from api import views
from .views import MyTokenObtainPairView, contact, users, passwordResetConfirm, passwordReset, userDetails, catList, catDetails, donations, adoptionRequest, adoptionRequestDetails, auctionItemDetailsUpdate, auction, auctionArchives, auctionDetails, auctionItemDetails, carouselDetails, carouselDetailsUpdate, veterinariansDetails, veterinariansDetailsUpdate, auctionDetailsUpdate
from rest_framework_simplejwt.views import (
    TokenRefreshView)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('users', users, name="users"),
    path('userDetails/<int:id>', userDetails, name="user_details"),
    path('passwordReset', passwordReset, name="password_reset"),
    path('passwordResetConfirm/<token>', passwordResetConfirm, name="password_reset_confirm"),
    path('auction', auction, name="auction"),
    path('auctionDetails', auctionDetails, name='auction_details'),
    path('auctionDetails/<int:id>', auctionDetailsUpdate,
         name='auction_details_update'),
    path('auctionDetails/items', auctionItemDetails, name="auction_item_details"),
    path('auctionDetails/items/<int:id>', auctionItemDetailsUpdate,
         name="auction_item_details_update"),
    path('auction/archives', auctionArchives, name="auction_archives"),
    path('carouselDetails', carouselDetails, name='carousel_details'),
    path('carouselDetails/<int:id>', carouselDetailsUpdate,
         name="carousel_details_update"),
    path('veterinariansDetails', veterinariansDetails,
         name='veterinarians_details'),
    path('veterinariansDetails/<int:id>', veterinariansDetailsUpdate,
         name='veterinarians_details_update'),
    path('catList', catList,
         name="cat_list"),
    path('catList/<int:id>', catDetails,
         name="cat_list_details"),
    path('adoptionRequest', adoptionRequest,
         name="adoption_request"),
    path('adoptionRequest/<int:id>', adoptionRequestDetails,
         name="adoption_request_details"),
    path('donations', donations, name="donations"),
    path('contact', contact, name="contact"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
