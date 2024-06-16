import VehicleForm from "./components/VehicleForm";
import VehicleDetail from "./components/VehicleDetail";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
function App() {
  const AppLayout = () => {
    return (
      <div className="app">
        <Outlet />
      </div>
    );
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <VehicleForm />,
        },
        {
          path: "/vehicle-details",
          element: <VehicleDetail />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
