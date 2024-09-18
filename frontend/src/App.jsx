import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
// import Navbar from "./components/Navbar";
// import Carousel from "./components/Carousel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar/>
      <Carousel/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
