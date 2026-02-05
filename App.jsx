import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./auth/useAuth";
import AutoLogoutHandler from "./auth/AutoLogoutHandler";
import router from "./router/AppRouter";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen text-xs">
      <AuthProvider>
        <div className="flex-grow">
          <RouterProvider router={router}>
            <AutoLogoutHandler />
          </RouterProvider>
        </div>
      </AuthProvider>
      <Toaster />
    </div>
  );
};

export default App;
