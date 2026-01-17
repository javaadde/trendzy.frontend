import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import axios from "./axios.jsx";

// PROTECTING HANDLERS
import ProtectedToAdmin from "./ProtectedToAdmin.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ProtectedIfLogined } from "./ProtectedIfLogined.jsx";
import { ProtectedIfNotLogined } from "./ProtectedIfNotLogined.jsx";


//  PAGES OF USERS
import Home from "./pages/user/Home/Home.jsx";
import HomeNotLogined from "./pages/user/Home_unknown/HomeNotLogined.jsx";
import SignIn from "./pages/user/SignIn/SignIn.jsx";
import SignUp from "./pages/user/SignUp/SignUp.jsx";
import Setting from "./pages/user/Settings/Setting.jsx";
import Cart from "./pages/user/Cart/Cart.jsx";
import Products from "./pages/user/Products/Products.jsx";
import Orders from "./pages/user/Orders/Orders.jsx";
import OrderDetails from "./pages/user/Orders/OrderDetails.jsx";


// PAGES OF ERRORS
import NotFoundPage from "./pages/error/404.jsx";
import UnOtherizedPage from "./pages/error/401.jsx";

// ADMIN PAGES
import SignInAdmin from "./pages/admin/SignIn/SignIn.jsx";
import AdminHome from "./pages/admin/Home/Home.jsx";
import AdminProducts from "./pages/admin/Products/Products.jsx";
import AdminOrders from "./pages/admin/Orders/Orders.jsx";
import OrderDetailsForAdmin from "./pages/admin/Orders/OrderDetails.jsx";
import UsersAdmin from "./pages/admin/Users/Users.jsx";
import Category from "./pages/admin/Categories/Category.jsx";




function App() {


  return (
    <>


      <Router>
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* unkown user home route */}
          <Route path="/unknown" element={<HomeNotLogined />} />

          {/* Login route */}
          <Route path="/login" element={
            <ProtectedIfLogined>
              <SignIn />
            </ProtectedIfLogined>
          } />

          {/* signup route */}
          <Route path="/signUp" element={
            <ProtectedIfLogined>
              <SignUp />
            </ProtectedIfLogined>
          } />



          {/* settings route */}
          <Route path="/settings" element={<Setting />} />

          {/* cart route */}
          <Route path="/cart" element={
            <ProtectedIfNotLogined>
              <Cart />
            </ProtectedIfNotLogined>
          } />


          {/* cart route */}
          <Route path="/products" element={
            <ProtectedIfNotLogined>
              <Products />
            </ProtectedIfNotLogined>
          } />


          {/* ORDERS route */}
          <Route path="/orders" element={
            <ProtectedIfNotLogined>
              <Orders />
            </ProtectedIfNotLogined>
          } />

          {/* ORDERS route */}
          <Route path="/order/details/:id" element={<OrderDetails />} />

          {/* Eroor Pages */}

          {/* 404 route */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* 401 route */}
          <Route path="/401" element={<UnOtherizedPage />} />

          {/* ADMIN PAGES */}

          {/* none protected */}
          <Route path="/admin/login" element={<SignInAdmin />} />

          {/* protected */}
          {/* home admin route */}

          <Route
            path="/admin"
            element={
              <ProtectedToAdmin>
                <AdminHome />
              </ProtectedToAdmin>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedToAdmin>
                <AdminProducts />
              </ProtectedToAdmin>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedToAdmin>
                <AdminOrders />
              </ProtectedToAdmin>
            }
          />

          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedToAdmin>
                <OrderDetailsForAdmin />
              </ProtectedToAdmin>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedToAdmin>
                <UsersAdmin />
              </ProtectedToAdmin>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedToAdmin>
                <Category />
              </ProtectedToAdmin>
            }
          />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Router>


    </>
  );
}

export default App;
