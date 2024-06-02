import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ListProduct from "./pages/List";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<Dashboard />} />
        <Route path="/list" element={<ListProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
