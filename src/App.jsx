import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
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
import NotFound from "./pages/notFound/NotFound.jsx";
import {useContext} from "react";
import {
    AuthContext
} from "./context/AuthContext.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);

  return (
    <>
        <Navigation />
        <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works/:bookId" element={<BookDetails />}/>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/signin" element={<SignIn />} />
            // user can only see the profilepage when logged in, isAuth=true
            <Route path="/profile" element={isAuth ? <Profile />: <Navigate to="/"/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
        </main>
        <Footer />
    </>
  )
}

export default App
