import model from "../../api/Model";
import Router from "../../router";

class LoginValidation {
    static async login() {
        const usernameInput = document.querySelector('.login_login__input') as HTMLInputElement;
        const passwordInput = document.querySelector('.password_input') as HTMLInputElement;
        try {
            usernameInput.setCustomValidity('')
            passwordInput.setCustomValidity('')
            const res = await model.auth.login(usernameInput.value, passwordInput.value)
            localStorage.setItem('sessionId', res.sessionId)
            localStorage.setItem('userId', res.id.toString());
            document.querySelector('header')?.classList.add('header');
            window.history.pushState({}, '', '/recomendation');
            Router.handleLocation();
        } catch {
            usernameInput.setCustomValidity('sss')
            passwordInput.setCustomValidity('sss')
            const a = document.querySelectorAll('.validate_error');
            (a[1] as HTMLElement).classList.remove('hide_error');
            (a[1] as HTMLElement).addEventListener('mouseover', () => {
                (a[1] as HTMLElement).classList.add('hide_error');
                usernameInput.setCustomValidity('')
                passwordInput.setCustomValidity('')
            })
        }
    }

    static async signup(e: Event) {
        const usernameInput = document.querySelector('.signup_login__input') as HTMLInputElement;
        const passwordInput = document.querySelector('.signup_password_input') as HTMLInputElement;
        const passwordConfirmInput = document.querySelector('.signup_password_confirm') as HTMLInputElement;
        passwordInput.minLength = 5;
        passwordConfirmInput.minLength = 5;
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()+=-]{5,22}$/;
        const loginRegex = /^[a-zA-Z0-9]{5,22}$/;
        const validUsername = loginRegex.test(usernameInput.value);
        const validPassword = passwordRegex.test(passwordInput.value);
        const a = document.querySelectorAll('.validate_error');
        const login = a[0] as HTMLElement;
        login.addEventListener('mouseover', () => {
            login.classList.add('hide_error');
            usernameInput.setCustomValidity('')
            passwordInput.setCustomValidity('')
        })
        let valid = true;
        if (passwordInput.value === passwordConfirmInput.value && validPassword) {
            passwordInput.setCustomValidity('');
            passwordConfirmInput.setCustomValidity('');
        } else {
            valid = false;
            login.textContent = "Passwords don't match";
            passwordInput.setCustomValidity('hh');
            passwordConfirmInput.setCustomValidity('hh');
            login.classList.remove('hide_error');
            return
        }
        if (valid && validUsername) {
            try {
                await model.auth.signUp(usernameInput.value, passwordInput.value);
                (e.target as HTMLButtonElement).textContent = "✓"
                setTimeout(() => {
                    (e.target as HTMLButtonElement).textContent = "Sign up";
                    const popups = document.querySelector('.popups') as HTMLBodyElement;
                    popups.classList.add('login_active')
                    popups.classList.remove('signup_active')
                }, 1000);
            } catch (error) {
                usernameInput.setCustomValidity('ss');
                login.classList.remove('hide_error');
                login.textContent = 'Username already exist, please try again.';
            }
        } else {
            usernameInput.setCustomValidity('ss');
            login.classList.remove('hide_error');
            login.textContent = 'Username has to be longer than 4 letters, lesser than 22 letters and don`t have spaces';
        }
    }
}

export default LoginValidation;