import React, {useCallback, useEffect, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Routes ,Route} from "react-router-dom";
import Page from "./components/Page/Page";
import AdminForm from "./components/AdminForm/AdminForm";
import {PagesType} from "./types";
import axiosApi from "./axiosApi";
import {Container} from "react-bootstrap";

function App() {
  const [pages, setPages] = useState<PagesType []>([]);

  const fetchPagesNames = useCallback(async () => {
    const pagesResponse = await axiosApi.get("/pages.json");
    setPages(pagesResponse.data);
  }, []);

  useEffect(() => {
    void fetchPagesNames();
  }, [fetchPagesNames]);

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
