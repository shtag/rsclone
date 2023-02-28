class LoginPageView {

    static renderPage() {
        return `
        <div class="login_page">
            <div class="login_form">
                <h1>Explore Kotogram!</h1>
                <div class="signup_btn"><div class="text_button">Sign up</div></div>
                <div class="login_btn"><div class="text_button">Login</div></div>
            </div>
            <div class="popups">
                ${LoginPageView.openSignupPopup()}
                ${LoginPageView.openLoginPopup()}
            </div>
        </div>`
    }

    static openLoginPopup() {
        return `
        <div class="login_popup">
            <div class="popup_wrapper">
                <h2>Login</h2>
                <input type="text" class="login_login__input reg_input" placeholder="Enter username">
                <input type="password" class="password_input reg_input" placeholder="Enter password">
                <button class="login_popup__btn" type="button">Login</button>
            </div>
            ${LoginPageView.validateErr('Username or password is not correct, please try again.')}
        </div>
        `
    }

    static validateErr(error: string) {
        return `
        <div class="validate_error hide_error">
            ${error}
        </div>`
    }

    static openSignupPopup() {
        return `
        <div class="signup_popup">
            <div class="popup_wrapper">
                <h2>Sign Up</h2>
                <input type="text" class="signup_login__input reg_input" placeholder="Enter username">
                <input type="password" 
                class="signup_password_input reg_input" 
                placeholder="Enter password" 
                title="Must contain 5 or more characters">
                <input type="password" 
                class="signup_password_confirm reg_input" 
                placeholder="Confirm password">
                <button class="login_popup__btn" type="button">Sign up</button> 
            </div>
            ${LoginPageView.validateErr('Username already exist, please try again.')}
        </div>`
    }
}

export default LoginPageView; 