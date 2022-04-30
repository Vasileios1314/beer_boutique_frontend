import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Events from "./pages/Events";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import EventDetails from "./pages/EventDetails";
import BusinessProfile from "./pages/BusinessProfile";
import PostBeer from "./pages/PostBeer";
import PostEvent from "./pages/PostEvent";
import CustomerProfile from "./pages/CustomerProfile";
import Footer from "./components/Footer";
import MyProfile from "./pages/myProfile";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Events />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beer" element={<PostBeer />} />
        <Route path="/postEvent" element={<PostEvent />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/business/:id" element={<BusinessProfile />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="my-profile" element={<MyProfile />} />
      </Routes>
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          &#8679;
        </button>
      )}
      <Footer />
    </div>
  );
}

export default App;
