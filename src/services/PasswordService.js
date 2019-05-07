const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const PasswordService = {
    isPasswordStrongEnough (password) {
        return regex.test(password)
    },    
}

export { PasswordService }