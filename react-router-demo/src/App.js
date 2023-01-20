import { Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="about" element={<About />}></Route>
    </Routes>
  );
}

export default App;
