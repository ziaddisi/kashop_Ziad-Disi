import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProductDetails from "./pages/products/ProductDetails";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import CategoriesPage from "./pages/categories/CategoriesPage";
import ProfileLayout from "./pages/profile/ProfileLayout";
import ProtectedRouter from "./ProtectedRouter";
import ProfileInfo from "./pages/profile/ProfileInfo";
import ProfileOrders from "./pages/profile/ProfileOrders";




const router = createBrowserRouter([
  {
    path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element:<Home/>
            },
            {
                path: "products",
                element:<Products/>
            },
            {
             path: '/products/:id',
             element: <ProductDetails />
            },
            {
                path: "categories",
                element:<CategoriesPage />
            },
            {
                path: "login",
                element: 
                    <Login/>
                
            },
            {
                path: "register",
                element:<Register/>
            },
            {
                path: "cart",
                element:
                    <ProtectedRouter>
                        <Cart />
                    </ProtectedRouter>
                          
                  
            },
            {
            path: "profile",
            element:( 
                <ProtectedRouter>
                <ProfileLayout />
                </ProtectedRouter>
            ),
            children: [
                {
                index: true,
                element: <ProfileInfo />
                },
                {
                path: "orders",
                element: <ProfileOrders />
                }
                    ]
            
                },
            
              
                            {
                path: "checkout",
                element:
                    <ProtectedRouter>
                        <Checkout />
                    </ProtectedRouter>
                    
                    
            }
    ]
  },    
]);

export default router;