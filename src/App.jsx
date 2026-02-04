import './App.css'
import {Routes, Route} from "react-router-dom";
import Navigation
    from "./components/navigation/Navigation.jsx";
import Home from "./pages/homePage/Home.jsx";
import Favorites from "./pages/favoritesPage/Favorites.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import Footer from "./components/footer/Footer.jsx"
import BookDetails
    from "./pages/bookDetails/BookDetails.jsx";
import Profile from "./pages/profile/Profile.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";

function App() {


  return (
    <>
        <Navigation />
        <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works/:bookId" element={<BookDetails />}/>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        </main>
        <Footer />
    </>
  )
}

export default App
