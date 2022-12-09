import React, {useCallback, useEffect, useState} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import {PagesType} from "./types";
import axiosApi from "./axiosApi";
import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import Page from "./components/Page/Page";
import AdminForm from "./components/AdminForm/AdminForm";

function App() {
  const location = useLocation();
  const [pages, setPages] = useState<PagesType []>([]);

  const fetchPagesNames = useCallback(async () => {
    try {
      const pagesResponse = await axiosApi.get("/pages.json");
      setPages(pagesResponse.data);
    } catch (e) {
      throw new Error("Error");
    }

  }, []);

  useEffect(() => {
    void fetchPagesNames();
  }, [location ,fetchPagesNames]);

  return (
    <>
      <header>
        <NavBar pages={pages}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={(
            <Container className="text-center pt-5">
              <span className="fs-1 fw-bold text-uppercase">Welcome to static</span>
            </Container>
          )}/>
          <Route path="/pages/:pageName" element={(
            <Page/>
          )}/>
          <Route path="/pages/admin" element={(
            <AdminForm/>
          )}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
