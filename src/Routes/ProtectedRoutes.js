import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import AppRoutes from '../routes';
import UserServices from '../services/UserServices/UserService'


const userServices = new UserServices();


const ProtectedRoutes = ({ children }) => {

    const token = localStorage.getItem("token")
    const [tokenValidation, setTokenValidation] = useState(null)

    const usuarioAutenticado = userServices.usuarioAutenticado()

    useEffect(() => {
      const verificarToken = async () => {
        try {
            if (token) {
                const tokenValido = await userServices.verificarToken(token);
                setTokenValidation(tokenValido.message)
            } else {
                setTokenValidation(false)
            }


        } catch (error) {
            console.error(error);
            setTokenValidation(false);

        }
    }
    verificarToken()

    }, [token])

    useEffect(() => {

        if (tokenValidation === 'Token válido') {
            console.log('entrou no children');
        }
    }, [tokenValidation]);

    if (tokenValidation === null) {
        return null; // ou um indicador de carregamento, se desejar
      }

    if (tokenValidation === 'Token válido') {
        return children;
    } else {
        return <Navigate to={'/login'} />;
    }

}

export default ProtectedRoutes