import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { LoadingScreen } from "@/components/LoadingScreen"
import { Index } from "@/pages/Index"
import { Products } from "@/pages/Products"
import { ProductDetail } from "@/pages/ProductDetail"
import { NotFound } from "@/pages/NotFound"
import * as React from "react"

/**
 * PageLoader — shows the loading screen on every route change.
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

function App() {
  return (
    <CartProvider>
      <Router>
        <PageLoader>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageLoader>
      </Router>
    </CartProvider>
  )
}

export default App
