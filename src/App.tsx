import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Routes ,Route} from "react-router-dom";
import Page from "./components/Page/Page";
import AdminForm from "./components/AdminForm/AdminForm";

function App() {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={(
            <span className="text-center">Wrong!</span>
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
