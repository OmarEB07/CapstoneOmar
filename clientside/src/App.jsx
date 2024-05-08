import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
// Lazy-loaded components
import LoadingScreen from "./components/LoadingScreen"; // Adjust the import path as needed

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductSearch = lazy(() => import("./pages/ProductSearch"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Chatbot = lazy(() => import("./pages/Chatbot")); // Import the Chatbot component

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<Chatbot />} /> // Add Chatbot route
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/search/:query" element={<ProductSearch />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Signin />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/order-history"
            element={user ? <OrderHistory /> : <Navigate to="/login" replace />}
          />
          {/* More routes can be added here as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
