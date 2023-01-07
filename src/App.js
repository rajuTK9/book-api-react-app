import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
