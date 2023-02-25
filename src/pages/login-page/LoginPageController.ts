import { resetInputs } from "../../types/functions";
import LoginPageView from "./LoginPageView";
import LoginValidation from "./LoginValidation";
import './login_page.scss'

class LoginPageController {

    static renderLoginPage() {
        (document.querySelector('.header') as HTMLBodyElement).classList.remove('header');
        const body = document.querySelector('main') as HTMLBodyElement;
        body.innerHTML = '';
        body.innerHTML = LoginPageView.renderPage();
        LoginPageController.setListeners();
    }

    static openLoginPopup() {
        const body = document.querySelector('body') as HTMLBodyElement;
        body.innerHTML += LoginPageView.openLoginPopup();
        LoginPageController.setListeners();
    }

    static setListeners(): void {
        const loginPageForm = document.querySelector('.login_form') as HTMLFormElement;
        const inputs = document.querySelectorAll('.reg_input') as NodeListOf<HTMLInputElement>
        const body = document.querySelector('body') as HTMLBodyElement;
        const popups = document.querySelector('.popups') as HTMLBodyElement;
        body.addEventListener('click', (e) => {
            const targetLog = (e.target as HTMLElement).closest('.login_btn');
            const targetSign = (e.target as HTMLElement).closest('.signup_btn');
            if (targetLog) {
                loginPageForm.classList.add('login_form__active')
                popups.classList.add('login_active')
                popups.classList.remove('signup_active')
                resetInputs(inputs)
            } else if (targetSign) {
                loginPageForm.classList.add('login_form__active')
                popups.classList.add('signup_active')
                popups.classList.remove('login_active')
                resetInputs(inputs)
            }
            if ((e.target as HTMLElement).classList.contains('login_popup__btn')) {
                if ((e.target as HTMLElement).textContent === 'Login') {
                    e.preventDefault();
                    LoginValidation.login();
                } else if ((e.target as HTMLElement).textContent === 'Sign up') {
                    LoginValidation.signup(e);
                }
            }
        })
    }
}

export default LoginPageController;