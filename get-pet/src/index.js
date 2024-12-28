import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootLayout from "./Routes/RootLayout";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Listings from "./Components/Listings";
import ErrorPage from "./Routes/ErrorPage";
import ProfilePage from "./Routes/ProfilePage";
import AboutPage from "./Routes/AboutPage";
import Forum from "./Routes/Forum";
import FAQPage from "./Routes/FAQPage";
import Login from "./Components/Login";
import Signup from "./Routes/Signup";
import ForgotPassword from "./Routes/ForgotPassword";
import CompleteProfile from "./Routes/CompleteProfile";
import NewListing from "./Routes/NewListing";
import PostFullPage from "./Routes/PostFullPage";
import AddQuestionToForum from "./Routes/AddQuestionToForum";
import { AuthProvider } from "./Components/AuthContext";
import { FilterProvider } from "./Components/FilterContext";
import QuestionFullPage from "./Components/QuestionFullPage";

import MessagesPage from "./Routes/Messages";
import ConversationPage from "./Routes/ConversationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Listings />,
      },
      { path: "/new-listing", element: <NewListing /> },
      { path: "/listings/:listingId", element: <PostFullPage /> },
      { path: "/questions/:questionId", element: <QuestionFullPage /> },
      { path: "/profile/:id", element: <ProfilePage /> },
      {
        path: "/about",
        element: <AboutPage />,
      },
      { path: "/forum", element: <Forum /> },

      { path: "/messages", element: <MessagesPage /> },
      { path: "/messages/:senderId", element: <ConversationPage /> },

      {
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/signup", element: <Signup /> },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/completeProfile",
        element: <CompleteProfile />,
      },
      { path: "/addQuestion", element: <AddQuestionToForum /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <FilterProvider>
      <RouterProvider router={router}>{/* Diğer bileşenler */}</RouterProvider>
    </FilterProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
