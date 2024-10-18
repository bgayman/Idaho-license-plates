import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const Root: React.FC = () => {
  return (
      <Routes>
        <Route path="/:prefix" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
  );
};

export default Root;
