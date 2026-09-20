import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/auth/authThunks";

import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import MainLayout from "./layouts/MainLayout";
import OwnerLayout from "./layouts/OwnerLayout";

// Public Pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import MyReservations from "./pages/MyReservations";
import Favorites from "./pages/Favorites";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyProperties from "./pages/owner/MyProperties";
import CreateProperty from "./pages/owner/CreateProperty";
import EditProperty from "./pages/owner/EditProperty";
import PropertyReservations from "./pages/owner/PropertyReservations";

// Common
import NotFound from "./pages/NotFound";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import { getFavorites } from "./features/favorites/favoriteThunks";

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
    dispatch(getFavorites());
  }, [dispatch]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/reservations"
          element={
            <ProtectedRoute roles={["User"]}>
              <MyReservations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute roles={["User"]}>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Owner Routes */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute roles={["Owner"]}>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OwnerDashboard />} />
        <Route path="properties" element={<MyProperties />} />
        <Route path="properties/new" element={<CreateProperty />} />
        <Route path="properties/:id/edit" element={<EditProperty />} />
        <Route
          path="properties/:id/reservations"
          element={<PropertyReservations />}
        />
      </Route>
    </Routes>
  );
}

export default App;
