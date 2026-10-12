import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Services from "./components/Services";

import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contacts from "./components/Contacts";
const Home: React.FC = () => <div>Главная – placeholder</div>;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
