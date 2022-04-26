import React, { useEffect } from "react";
import "./App.css";

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

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
