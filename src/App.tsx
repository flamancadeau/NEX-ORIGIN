import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { LoadingScreen } from "@/components/LoadingScreen"
import { Index } from "@/pages/Index"
import { Products } from "@/pages/Products"
import { ProductDetail } from "@/pages/ProductDetail"
import { Checkout } from "@/pages/Checkout"
import { Login } from "@/pages/Login"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardOverview } from "@/pages/dashboard/DashboardOverview"
import { DashboardProducts } from "@/pages/dashboard/DashboardProducts"
import { DashboardOrders } from "@/pages/dashboard/DashboardOrders"
import { DashboardReports } from "@/pages/dashboard/DashboardReports"
import { NotFound } from "@/pages/NotFound"
import * as React from "react"

/**
 * PageLoader — shows the loading screen on every route change (storefront only).
 */
function PageLoader({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loadingKey, setLoadingKey] = React.useState(0);

  React.useEffect(() => {
    setLoadingKey(prev => prev + 1);
  }, [location.pathname]);

  return (
    <>
      <LoadingScreen key={loadingKey} />
      {children}
    </>
  );
}

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Storefront routes — with page loader */}
            <Route path="/" element={<PageLoader><Index /></PageLoader>} />
            <Route path="/products" element={<PageLoader><Products /></PageLoader>} />
            <Route path="/products/:id" element={<PageLoader><ProductDetail /></PageLoader>} />
            <Route path="/checkout" element={<PageLoader><Checkout /></PageLoader>} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard — protected, no page loader */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardOverview />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="orders" element={<DashboardOrders />} />
              <Route path="reports" element={<DashboardReports />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
