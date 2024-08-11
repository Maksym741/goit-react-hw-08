import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import Layout from "../Layout/Layout";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const ContactsPage = lazy(() => import("../../pages/ContactsPage"));
const HomePage = lazy(() => import("../../pages/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage")
);
function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <div>
      <p>Refreshing, need to wait.</p>
    </div>
  ) : (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute element={<ContactsPage />} redirectTo="/login" />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                element={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute element={<LoginPage />} redirectTo="/contacts" />
            }
          />
        </Routes>
      </Suspense>
      <Toaster />
    </Layout>
  );
}
export default App;


