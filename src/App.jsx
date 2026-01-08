import './App.css'
import {Routes, Route} from "react-router-dom";
import Navigation
    from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Login from "./pages/login/Login.jsx";

function App() {


  return (
    <>
        <Navigation />
        <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="login" element={<Login />} />
        </Routes>
        </main>
    </>
  )
}

export default App
