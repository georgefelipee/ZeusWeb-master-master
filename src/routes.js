import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import Registro from "./pages/Register/index";
import LoginNew from "./pages/LoginNew";
import { AuthProvider } from "./Context/Authprovider";

function AppRoutes() {

    return (
     <AuthProvider>
              <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoutes>
                   <Home/>
                </ProtectedRoutes>}> </Route>
                <Route path="/login" element={ <LoginNew/> }> </Route>
                <Route path="/register" element={<Registro />}> </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
      

    )
}

export default AppRoutes;