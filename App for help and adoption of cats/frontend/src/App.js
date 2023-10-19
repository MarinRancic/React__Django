import "./App.css";
import React, { Fragment, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./Components/Context/AuthContext";
import Home from "./Pages/Home/Home";
import Donations from "./Pages/Donations/Donations";
import Contact from "./Pages/Contact/Contact";
import Auction from "./Pages/Auction/Auction";
import Veterinarians from "./Pages/Veterinarians/Veterinarians";
import ScrollToTop from "./Components/Utils/ScrollToTop";
import Login from "./Components/Login/Login";
import Layout from "./Components/UI/Layout/Layout";
import Registration from "./Components/Registration/Registration";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import CarouselDetails from "./Pages/Admin/CarouselDetails/CarouselDetails";
import VeterinariansDetails from "./Pages/Admin/VeterinariansDetails/VeterinariansDetails";
import AuctionDetails from "./Pages/Admin/AuctionDetails/AuctionDetails";
import EditAuctionDetails from "./Components/Admin/Auctions/EditAuctionDetails";
import AuctionItemsDetails from "./Pages/Admin/AuctionDetails/AuctionItemsDetails/AuctionItemsDetails";
import AuctionArchive from "./Components/Admin/Auctions/AuctionArchive";
import Adopted from "./Pages/Cats/Adopted/Adopted";
import WaitingAdoption from "./Pages/Cats/WaitingAdoption/WaitingAdoption";
import WaitingAdoptionDetails from "./Components/Admin/Cats/WaitingAdoption/WaitingAdoptionDetails";
import AdoptedDetails from "./Components/Admin/Cats/Adopted/AdoptedDetails";
import AdoptedItemDetails from "./Components/Cats/Adopted/AdoptedItemDetails";
import WaitingAdoptionItemDetails from "./Components/Cats/WaitingAdoption/WaitingAdoptionItemDetails";
import AdoptedDetailsItem from "./Components/Admin/Cats/Adopted/AdoptedDetailsItem";
import WaitingAdoptionDetailsItem from "./Components/Admin/Cats/WaitingAdoption/WaitingAdoptionDetailsItem";
import AdoptionRequests from "./Components/Admin/Cats/WaitingAdoption/AdoptionRequests";
import DonationDetails from "./Components/Admin/Donations/DonationDetails";
import PasswordResetConfirm from "./Components/PasswordReset/PasswordResetConfirm";
import Users from "./Pages/Admin/Users/Users";
import UserProfile from "./Pages/User/UserProfile";

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {user?.role === "admin" ? (
            <Route path="/carouselDetails" element={<CarouselDetails />} />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "admin" ? (
            <Route path="/users" element={<Users />} />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "user" ? (
            <Route path="/myProfile" element={<UserProfile />} />
          ) : (
            <Route element={<Home />} />
          )}

          <Route path="/veterinarians" element={<Veterinarians />} />

          {user?.role === "admin" ? (
            <Route
              path="/veterinariansDetails"
              element={<VeterinariansDetails />}
            />
          ) : (
            <Route element={<Home />} />
          )}

          <Route path="/donations" element={<Donations />} />

          {user?.role === "admin" ? (
            <Route path="/donationDetails" element={<DonationDetails />} />
          ) : (
            <Route element={<Home />} />
          )}

          <Route path="/auction" element={<Auction />} />

          <Route path="/auction/archive/:id" element={<AuctionArchive />} />

          {user?.role === "admin" ? (
            <Route path="/auctionDetails" element={<AuctionDetails />} />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "admin" ? (
            <Route
              path="/auctionDetails/:id"
              element={<EditAuctionDetails />}
            />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "admin" ? (
            <Route
              path="/auctionDetails/items"
              element={<AuctionItemsDetails />}
            />
          ) : (
            <Route element={<Home />} />
          )}

          <Route path="/contact" element={<Contact />} />

          <Route path="/adopted" element={<Adopted />} />

          <Route path="/adopted/:id" element={<AdoptedItemDetails />} />

          {user?.role === "admin" ? (
            <Route path="/adoptedDetails" element={<AdoptedDetails />} />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "admin" ? (
            <Route
              path="/adoptedDetails/:id"
              element={<AdoptedDetailsItem />}
            />
          ) : (
            <Route element={<Home />} />
          )}

          <Route path="/waitingAdoption" element={<WaitingAdoption />} />

          <Route
            path="/waitingAdoption/:id"
            element={<WaitingAdoptionItemDetails />}
          />

          {user?.role === "admin" ? (
            <Route
              path="/waitingAdoption/requests"
              element={<AdoptionRequests />}
            />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "admin" ? (
            <Route
              path="/waitingAdoptionDetails"
              element={<WaitingAdoptionDetails />}
            />
          ) : (
            <Route element={<Home />} />
          )}

          {user?.role === "admin" ? (
            <Route
              path="/waitingAdoptionDetails/:id"
              element={<WaitingAdoptionDetailsItem />}
            />
          ) : (
            <Route element={<Home />} />
          )}
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/password_reset" element={<PasswordReset />} />
        <Route
          path="/password_reset/:token"
          element={<PasswordResetConfirm />}
        />
      </Routes>
    </Fragment>
  );
}

export default App;
