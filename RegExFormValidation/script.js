const formFields = {
    email: document.getElementById('email'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
}

const Modal = {
    toggle() {
        document.querySelector(".modal-overlay").classList.toggle("active")
    }
}

function showMessageError(inputEl) {
    const messageErrorEl = inputEl.parentElement.querySelector('.check')
    messageErrorEl.classList.add('error-message')
}

function clearMessageError(inputEl) {
    inputEl
        .parentElement
        .querySelector('.check')
        .classList
        .remove('error-message')
}

function clearAllErrors() {
    clearMessageError(email)
    clearMessageError(username)
    clearMessageError(password)
}

const Form = {
    checkValidation(event) {
        event.preventDefault();
        clearAllErrors();

        /**
         * Ao menos um caractere maiusculo
         * Ao menos um símbolo
         * Pelo menos 6 dígitos e no máximo 12 digitos
         * Ao menos um número
         * 
         * schema : shape
         * 
         * schema validation libs: Yup; Joi 
         */

        const validate = {
            email: () => {
                const emailPattern = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/

                const isValid = emailPattern.test(formFields.email.value)

                if (!isValid) {
                    showMessageError(email)
                }

                return isValid;
            },
            username: () => {
               const  usernamePattern = /^[a-zA-Z]+$/

               const isValid = usernamePattern.test(formFields.username.value)
               
               if (!isValid) {
                    showMessageError(username)    
               }

               return isValid;
            },
            password: () => {
                const checkCapitalize = /[A-Z]/g;
                const checkSymbol = /[!@#$%&*()+\-.,;?\^.,;?><:{}\[\]]/g;
                const checkNumber = /[0-9]/;

                const isValid = checkCapitalize.test(formFields.password.value)
                    && checkSymbol.test(formFields.password.value)
                    && checkNumber.test(formFields.password.value)
                    && (password.value.length >= 6 || password.value.length <= 12)

                if (!isValid) {
                    showMessageError(password)
                }

                return isValid;
            },
        }

        const isFormValid = Object.keys(formFields).reduce((isValid,field) => { 
            const result = validate[field]()

            if (!isValid) {
                return false;
            }

            return result;
        }, true)

        if (isFormValid){
            // chamar uma API para enviar os dados do formulário
            // featch api
            // axios
            Modal.toggle();
        }
    },

    clearFields() {
        email.value = "";
        username.value = "";
        password.value = "";
    }
}