import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Services: React.FC = () => <div>Услуги – placeholder</div>;
const Portfolio: React.FC = () => <div>Работы – placeholder</div>;
const About: React.FC = () => <div>О мастере – placeholder</div>;
const Contact: React.FC = () => <div>Контакты – placeholder</div>;
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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
