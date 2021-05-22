const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

const invalidFieldMessage = document.querySelectorAll('.check')

const Modal = {
    toggle() {
        document.querySelector(".modal-overlay").classList.toggle("active")
    }
}

const Form = {
    checkValidation(event) {
        event.preventDefault();
    
        const patterns = {
            emailPattern: /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/,
            usernamePattern: /^[a-zA-Z]+$/,
            passwordPattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()+\-.,;?\^.,;?><:{}\[\]])[\w!@#$%&*()+\-.,;?\^.,;?><:{}\[\]]{6,12}$/
        }
    
        if(patterns.emailPattern.test(email.value)) {
            invalidFieldMessage[0].classList.remove('error-message')
        } else {
            invalidFieldMessage[0].classList.add('error-message');
        }
    
        if(patterns.usernamePattern.test(username.value)) {
            invalidFieldMessage[1].classList.remove('error-message')
        } else {
            invalidFieldMessage[1].classList.add('error-message')
        }
    
        if(patterns.passwordPattern.test(password.value)) {
            invalidFieldMessage[2].classList.remove('error-message')
        } else {
            invalidFieldMessage[2].classList.add('error-message')
        }
    
        if (patterns.emailPattern.test(email.value) && patterns.usernamePattern.test(username.value) && patterns.passwordPattern.test(password.value)) Modal.toggle();
    
        // event.preventDefault();
        // if(!patterns.emailPattern.test(email.value)) invalidFieldMessage[0].classList.add('error-message')
        // if(!patterns.usernamePattern.test(username.value)) invalidFieldMessage[1].classList.add('error-message')
        // if(!patterns.passwordPattern.test(password.value)) invalidFieldMessage[2].classList.add('error-message')
    },

    clearFields() {
        email.value = "";
        username.value = "";
        password.value = "";
    }
}

