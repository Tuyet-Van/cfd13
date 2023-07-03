import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import PageOverlay from "../components/PageOverlay";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import Footer from "../components/Footer";
import Modal from "../components/Modal";
import ModalLogin from "../components/ModalLogin";
import { AuthenProvider } from "../components/AuthenContext";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  return (
    <AuthenProvider>
      {/* Page effect */}
      <PageOverlay />

      {/* Header */}
      <Header />

      {/* Nav */}
      <NavBar />

      {/* Main */}
      <Outlet />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal />
      <ModalLogin />
    </AuthenProvider>
  );
};

export default MainLayout;
