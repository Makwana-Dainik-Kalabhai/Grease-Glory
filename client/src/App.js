import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import Home from "./pages/Home/Home";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { Contact } from "./pages/Contact/Contact";
import { Food } from "./pages/Food/Food";
import { Recipe } from "./pages/Recipe/Recipe";
import { RecipeDetails } from "./pages/Recipe/RecipeDetails/RecipeDetails";
import { Cart } from "./pages/Cart/Cart";
import UserOrders from "./pages/Orders/Orders";
import { Profile } from "./pages/Profile/Profile";

//! Admin Panel
import AdminLayout from "./AdminLayout";
import { Dashboard } from "./admin/pages/Dashboard";
import { Chart } from "./admin/pages/Chart";
import { Users } from "./admin/pages/Users/Users";
import { Foods } from "./admin/pages/Foods/Foods";
import { Orders } from "./admin/pages/Orders/Orders";
import { Analytics } from "./admin/pages/Analytics";

function App() {
  useEffect(() => {
    if (window.ethereum) {
      // Handle chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      return () => {
        window.ethereum.removeListener("chainChanged", () => {});
      };
    }
  }, []);

  const router = createBrowserRouter([
    //! Admin Layout
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "/admin", element: <Dashboard /> },
        { path: "/admin/analytics", element: <Analytics /> },
        { path: "/admin/charts", element: <Chart /> },
        { path: "/admin/users", element: <Users /> },
        { path: "/admin/foods", element: <Foods /> },
        { path: "/admin/orders", element: <Orders /> },
      ],
    },

    //! User Layout
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/food", element: <Food /> },
        { path: "/food/:category", element: <Food /> },
        { path: "/searchFood/:food", element: <Food /> },
        { path: "/recipe", element: <Recipe /> },
        { path: "/recipe/recipe-details/:id", element: <RecipeDetails /> },
        { path: "/contact", element: <Contact /> },
        { path: "/orders", element: <UserOrders /> },
        { path: "/cart", element: <Cart /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
