const validarEmail = (email) => {
   return email?.toString().includes('@') && email?.toString().includes('.')

}

const validarSenha = (senha) => {
   return senha?.toString().length > 1
}

const validarNome = (nome) => {
   return nome?.toString().length != undefined && nome?.toString().length > 1
}

const validarConfirmPassword = (senha, confirmPassword) => {

   return validarSenha(senha) && senha === confirmPassword

}

export {
   validarEmail,
   validarSenha,
   validarNome,
   validarConfirmPassword

}