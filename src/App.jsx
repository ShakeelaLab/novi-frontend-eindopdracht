import './App.css'
import {Routes, Route} from "react-router-dom";
import Navigation
    from "./components/navigation/Navigation.jsx";
import Home from "./pages/homePage/Home.jsx";
import Favorites from "./pages/favoritesPage/Favorites.jsx";
import Login from "./pages/loginPage/Login.jsx";
import Footer from "./components/footer/Footer.jsx"

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
        <Footer />
    </>
  )
}

export default App
