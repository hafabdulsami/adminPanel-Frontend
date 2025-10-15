import React from "react";
import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout />
    </Router>
  );
}

export default App;
