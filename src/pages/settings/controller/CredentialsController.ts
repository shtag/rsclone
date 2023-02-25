import confetti from 'canvas-confetti';

import model from '../../../api/Model';

class CredentialsController {
    static newLogin: string;

    static newPassword: string;

    static oldLogin: string;

    static async validateNewLogin() {
        const login = document.querySelector('.settings__input_login') as HTMLInputElement;
        const errorMessage = document.querySelector('.settings__error') as HTMLSpanElement;
        const submitBtn = document.querySelector('.settings__submitCredentials') as HTMLButtonElement;

        const allUsers = await model.user.getAll();

        const usernames = allUsers.map((user) => user.username);

        const loginRegex = /^[a-zA-Z0-9]{5,22}$/;

        const userId = localStorage.getItem('userId') as string;
        const userInfo = await model.user.get(+userId);
        const oldLogin = userInfo.username;
        CredentialsController.oldLogin = oldLogin;

        login.addEventListener('input', () => {
            const isLoginValid = loginRegex.test(login.value);

            if (usernames.includes(login.value)) {
                errorMessage.innerText = 'Username is already taken.';
                errorMessage.style.display = 'block';
                submitBtn.disabled = true;
            }

            if (!isLoginValid) {
                errorMessage.innerText = 'Invalid login';
                errorMessage.style.display = 'block';
                submitBtn.disabled = true;
            }

            if (login.value === '' && CredentialsController.newPassword) {
                submitBtn.disabled = false;
                errorMessage.style.display = 'none';
            }

            if (login.value !== oldLogin && isLoginValid && !usernames.includes(login.value)) {
                errorMessage.style.display = 'none';
                submitBtn.disabled = false;
                CredentialsController.newLogin = login.value;
            }

            if (CredentialsController.newPassword === 'invalid' && CredentialsController.newLogin) {
                submitBtn.disabled = true;
            }
        });
    }

    static async validateNewPassword() {
        const password = document.querySelector('.settings__input_password') as HTMLInputElement;
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()+=-]{5,22}$/;
        const submitBtn = document.querySelector('.settings__submitCredentials') as HTMLButtonElement;
        const errorMessage = document.querySelector('.settings__error_password') as HTMLSpanElement;
        const login = document.querySelector('.settings__input_login') as HTMLInputElement;

        password.addEventListener('input', () => {
            const isPasswordValid = passwordRegex.test(password.value);

            if (!isPasswordValid) {
                submitBtn.disabled = true;
                errorMessage.style.display = 'block';
                errorMessage.innerText = 'Invalid password';
                CredentialsController.newPassword = 'invalid';
            }

            if (password.value === '' && CredentialsController.newLogin) {
                submitBtn.disabled = false;
                errorMessage.style.display = 'none';
            }

            if (password.value === '' && login.value === '') {
                submitBtn.disabled = true;
            }

            if (isPasswordValid) {
                CredentialsController.newPassword = password.value.trim();
                submitBtn.disabled = false;
                errorMessage.style.display = 'none';
            }
        });
    }

    static async changeUserCredentials(sessionId: string, userId: string) {
        CredentialsController.validateNewLogin();
        CredentialsController.validateNewPassword();

        const submitBtn = document.querySelector('.settings__submitCredentials') as HTMLButtonElement;
        const form = document.querySelector('.settings__form-credentials') as HTMLFormElement;
        const errorMessage = document.querySelector('.settings__error_submit') as HTMLSpanElement;

        submitBtn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            try {
                if (CredentialsController.newLogin && !CredentialsController.newPassword) {
                    model.user.changeUsernamePassword(+userId, {
                        sessionId,
                        username: CredentialsController.newLogin,
                    });
                    window.history.pushState({}, '', `/${CredentialsController.newLogin}`);
                } else if (CredentialsController.newLogin && CredentialsController.newPassword) {
                    model.user.changeUsernamePassword(+userId, {
                        sessionId,
                        password: CredentialsController.newPassword,
                        username: CredentialsController.newLogin,
                    });
                    window.history.pushState({}, '', `/${CredentialsController.newLogin}`);
                } else if (!CredentialsController.newLogin && CredentialsController.newPassword) {
                    model.user.changeUsernamePassword(+userId, {
                        sessionId,
                        password: CredentialsController.newPassword,
                    });
                    window.history.pushState({}, '', `/${CredentialsController.oldLogin}`);
                }
                confetti({
                    particleCount: 400,
                    startVelocity: 90,
                    spread: 360,
                });
                form.reset();
                submitBtn.disabled = true;
            } catch (error) {
                errorMessage.textContent = 'Error occured';
                throw new Error();
            }
        });
    }
}

export default CredentialsController;
