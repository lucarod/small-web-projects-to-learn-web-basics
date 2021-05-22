const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

const invalidFieldMessage = document.querySelectorAll('.check')

function checkValidation(event) {
    const patterns = {
        emailPattern: /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/,
        usernamePattern: /^[a-zA-Z]+$/,
        passwordPattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()+\-.,;?\^.,;?><:{}\[\]])[\w!@#$%&*()+\-.,;?\^.,;?><:{}\[\]]{6,12}$/
    }

    if(patterns.emailPattern.test(email.value)) {
        invalidFieldMessage[0].classList.remove('error-message')
    } else {
        event.preventDefault();
        invalidFieldMessage[0].classList.add('error-message');
    }

    if(patterns.usernamePattern.test(username.value)) {
        invalidFieldMessage[1].classList.remove('error-message')
    } else {
        event.preventDefault();
        invalidFieldMessage[1].classList.add('error-message')
    }

    if(patterns.passwordPattern.test(password.value)) {
        invalidFieldMessage[2].classList.remove('error-message')
    } else {
        event.preventDefault();
        invalidFieldMessage[2].classList.add('error-message')
    }

    // if (patterns.emailPattern.test(email.value) && patterns.usernamePattern.test(username.value) && patterns.passwordPattern.test(password.value)) return

    // event.preventDefault();
    // if(!patterns.emailPattern.test(email.value)) invalidFieldMessage[0].classList.add('error-message')
    // if(!patterns.usernamePattern.test(username.value)) invalidFieldMessage[1].classList.add('error-message')
    // if(!patterns.passwordPattern.test(password.value)) invalidFieldMessage[2].classList.add('error-message')
}