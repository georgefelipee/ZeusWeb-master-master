import axios from "axios";


export default class UserServices {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API_LOGIN
        })
    }

    async login(dados) {
        const { data } = await this.axios.post('/login', dados)

        if (data) {
            localStorage.setItem('nome', data.nome)
            localStorage.setItem('email', data.email)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data))

            return true
        }

        return

    }

    async cadastrar(dados) {
        console.log(dados);
        return await this.axios.post('/register', dados)
    }

    async verificarToken(token) {

        try {
            const { data } = await this.axios.get('/validar-token', {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })
            if(data){
                console.log('ENTROU TRUE');
                console.log('Dados',data);
                return data
                
            }
        } catch (error) {
            console.log('ENTROU FALSE');
            console.log(error);
            return error.response.data.message

        }

    }

    usuarioAutenticado() {
        return localStorage.getItem("token") != undefined ? true : false
    }


}