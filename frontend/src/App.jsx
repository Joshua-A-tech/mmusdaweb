import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/LandingPage";
import Sermons from "./components/sermons/Sermons";
import Error from "./components/Error/Error";
import PrayerRequest from "./components/prayerRequest/PrayerRequest";
import ContactPage from "./pages/ContactPage";
import Beliefs from "./components/beliefs/Beliefs";
import AboutMmusda from "./components/aboutmmusda/AboutMmusda";
import Announcements from "./components/announcements/Announcements";
import Event from "./components/event/Event";
import AboutSDA from "./components/aboutsda/AboutSDA";
import Books from "./components/book/Book";
import Departments from "./components/departments/Departments";
import Leaders from "./components/leaders/Leaders";
import HomeChurches from "./components/homechurch/HomeChurch";
import Families from "./components/families/Families";
import Choirs from "./components/choirs/Choirs";
import Members from "./components/members/Members";
import Offering from "./components/offering/Offering";
import Suggestions from "./components/suggestions/Suggestions";
import "./App.css";

const RootLayout = () => {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: (
        <div className="site-wrapper">
          <Navbar />
          <Error />
          <Footer />
        </div>
      ),
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/sermons",
          element: <Sermons />,
        },
        {
          path: "/prayers",
          element: <PrayerRequest />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/about/beliefs",
          element: <Beliefs />,
        },
        {
          path: "/about/mmusda",
          element: <AboutMmusda />,
        },
        {
          path: "/announcements",
          element: <Announcements />,
        },
        {
          path: "/events",
          element: <Event />,
        },
        {
          path: "/about/sda",
          element: <AboutSDA />,
        },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/departments",
          element: <Departments />,
        },
        {
          path: "/leadership",
          element: <Leaders />,
        },
        {
          path: "/homechurches",
          element: <HomeChurches />,
        },
        {
          path: "/families",
          element: <Families />,
        },
        {
          path: "/choirs",
          element: <Choirs />,
        },
        {
          path: "/members",
          element: <Members />,
        },
        {
          path: "/become-member",
          element: <Members />,
        },
        {
          path: "/offering",
          element: <Offering />,
        },
        {
          path: "/suggestions",
          element: <Suggestions />,
        },
        {
          path: "/donations",
          element: <Offering />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "error-toast",
            success: "success-toast",
            info: "info-toast",
          },
        }}
      />
    </>
  );
}

export default App;
