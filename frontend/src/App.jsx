import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./components/Root/Root";
import Main from "./components/Main/Main";
import Todos from "./components/Todo/Todos";
import Projects from "./components/Projects/Projects";

const router = createBrowserRouter(
  [
      {
          path: "/",
          element: <Root />, // Rendering the "Root" component when the root path is matched
          id: "root", // Identifier for this route
          children: [
            {
              index: true, // Configuring this route as the default index route for the root path
              element: <Main />
            },
            {
              path: "/projects",
              element: <Projects />
            },
            {
              path: "/todos",
              element: <Todos />
            }
          ]
      }
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App
