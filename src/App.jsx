import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/Auth/LoginPage";
import AdminHomePage from "./pages/Admin/Dashboard/AdminHomePage";
import LandingPage from "./pages/LandingPage";
import TrendingPage from "./pages/Admin/Dashboard/TrendingPage";
import CategoriesPage from "./pages/Admin/Dashboard/CategoriesPage";
import WatchlistsPage from "./pages/Admin/Dashboard/WatchlistsPage";
import ExplorePage from "./pages/Admin/Dashboard/ExplorePage";
import SeriesPage from "./pages/Admin/Dashboard/SeriesPage";
import DownloadPage from "./pages/Admin/Dashboard/DownloadPage";
import SingleMoviePage from "./pages/Admin/Dashboard/SingleMoviePage";
import ProfilePage from "./pages/Admin/Dashboard/ProfilePage";
import NotificationsPage from "./pages/Admin/Dashboard/NotificationsPage";
import SupportPage from "./pages/Admin/Dashboard/SupportPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import GenrePage from "./pages/Admin/Dashboard/GenrePage";
import ForgotPage from "./pages/Auth/Forgot/ForgotPage";
import OtpPage from "./pages/Auth/Forgot/OtpPage";
import PasswordPage from "./pages/Auth/Forgot/PasswordPage";
import AuthCallback from "./components/auth/AuthCallback";
const AdminLayout = lazy(() => import("./components/admin/Layout"));
import ProtectRoute from "./components/auth/ProtectRoute";
import { useUser } from "./context/UserContext";

function App() {
  const { user, fetchUserProfile, loadingUser, loadingSubscription } =
    useUser();

  useEffect(() => {
    fetchUserProfile();
<<<<<<< HEAD
  }, [fetchUserProfile]);
=======
  }, []);

>>>>>>> eb5d3fc8e0791961036007926750490369713dc8
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectRoute
                user={user}
                loadingUser={loadingUser}
                loadingSubscription={loadingSubscription}
              />
            }
          >
            <Route path="/dashboard/" element={<AdminLayout />}>
              <Route path="home" element={<AdminHomePage />} />
              <Route path="trending" element={<TrendingPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="watchlists" element={<WatchlistsPage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="series" element={<SeriesPage />} />
              <Route path="downloads" element={<DownloadPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route
                path="categories/movie/:id"
                element={<SingleMoviePage />}
              />
<<<<<<< HEAD
              <Route
                path="genre/:genre"
                element={<GenrePage />}
              />
=======
              <Route path="genre/:genre" element={<TrendingPage />} />
>>>>>>> eb5d3fc8e0791961036007926750490369713dc8
            </Route>
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/dashboard/home">
                <LoginPage />
              </ProtectRoute>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/forgot/otp" element={<OtpPage />} />
          <Route path="/forgot/password" element={<PasswordPage />} />
          <Route
            path="/"
            element={
              <ProtectRoute user={!user} redirect="/dashboard/home">
                <LandingPage />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
