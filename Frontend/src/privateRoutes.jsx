import { Home, Profile, SignIn, SignUp } from "@/pages";
import AdminPage from "./pages/PageSuperAdmin/Adminpage";

export const privateRoutes = [
  {
    name: "home",
    path: "/admin",
    element: <AdminPage/>,
  }
];

export default privateRoutes;
