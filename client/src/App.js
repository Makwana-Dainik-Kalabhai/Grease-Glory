import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import Home from "./components/Home/Home";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { Logout } from "./Logout";
import { Contact } from "./pages/Contact/Contact";
import { Food } from "./pages/Food/Food";
import { Recipe } from "./pages/Recipe/Recipe";
import { RecipeDetails } from "./pages/Recipe/RecipeDetails/RecipeDetails";
import { Cart } from "./pages/Cart/Cart";
import { Orders } from "./pages/Orders/Orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/food",
          element: <Food />,
        },
        {
          path: "/recipe",
          element: <Recipe />,
        },
        {
          path: "/recipe/recipe-details/:id",
          element: <RecipeDetails />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
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
