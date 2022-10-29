function getCharacterLength(str) {
    return [...str].length;
  }

const useValidate = (inputname,input) => {
    let inputlenght = input ? getCharacterLength(input.trim()) : 0
    if (!input) {
        return {
            isValid : false,
            error : `${inputname} can't be blank`
        }
    }else if (inputlenght <= 3){
        return {
            isValid : false,
            error : `${inputname} must more 3 charaters`
        }
    }else {
        return {
            isValid : true,
            error :''
        }
    }
}

const useValidateUsername = (input) => {
    const {isValid,error} = useValidate('Username',input)
    if (!isValid) {
        return {
            isValid,error
        }
    }
    if (isValid) {
        const symbl = /^[a-zA-Z\-]+$/
        if (symbl.test(input)   === false) {
            return {
                isValid : false,
                error : 'Username invalid'
            }
        }else {
            return {
                isValid : true,
                error : ''
            }
        }
    }
}
const useValidateEmail = (input) => {
    const {isValid,error} = useValidate('Email',input)
    if (!isValid) {
        return {
            isValid,error
        }
    }
    if (isValid) {
        const symbl = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (symbl.test(input)   === false) {
            return {
                isValid : false,
                error : 'email is invalid'
            }
        }else {
            return {
                isValid : true,
                error : ''
            }
        }
    }
}

const useValidatePassword = (input) => {
    const {isValid,error} = useValidate('Password',input)
    if (!isValid) {
        return {
            isValid,error
        }
    }
    if (isValid) {
        // const symbl = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        // if (symbl.test(input) === false) {
        //     return {
        //         isValid : false,
        //         error : 'Password must contain minimum 8 letters and one special character'
        //     }
        // }else {
            return {
                isValid : true,
                error : ''
            }
        // }
    }
}

const useValidateRetypePass = (password,retypePass) => {
    const {isValid,error} = useValidate('Retype password', retypePass)
    if (!isValid) {
        return {isValid,error}
    }else {
        if (password === retypePass) {
            return {
                isValid : true,
                error : ''
            }
        }else {
            return {
                isValid : false,
                error : 'Retype pass invalid'
            }
        }
    }
}

export {
    useValidateUsername,useValidatePassword,useValidateEmail,useValidateRetypePass,useValidate
}