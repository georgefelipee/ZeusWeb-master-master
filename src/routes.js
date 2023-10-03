import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Registro from "./pages/Register";
import LoginNew from "./pages/LoginNew";

function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
               <Route path="/" element={ <LoginNew/> }> </Route>

                <Route path="/home" element={ <Home/> }> </Route>
                <Route path="/register" element={ <Registro/> }> </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes;