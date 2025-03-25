import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import './App.css'

function App() {


  return (
    <>

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
    </>
  )
}

export default App
