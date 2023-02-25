import './style.scss';

class SettingsView {
    static renderSettings() {
        return `
        <img class="settings__icon" src="/img/icons/settings-icon.png"/>
        <form class="settings__form-credentials">
           <div class="settings__credentials">
              <h2 class="settings__subtitle">User credentials</h2>
              <label class="settings__label">
              Login:<input type="text" name="login" class="settings__input settings__input_login" placeholder="Enter new login">
              <span class="settings__error"></span>
              </label>
              <label class="settings__label">
              Password:<input type="password" name="password" class="settings__input settings__input_password" placeholder="Enter new password">
              <span class="settings__error_password"></span>
              </label>
           </div>
           <button type="submit" class="settings__submitCredentials open__post-btn" disabled>
              <div class="text_button">Save changes</div>
           </button>
        </form>
        <div class="settings__interaction">
           <h2 class="settings__subtitle">User interaction</h2>
           <div class="settings__theme-block">
              <h3 class="settings__block-title">Theme: </h3>
              <input class="settings__theme" type="checkbox" name="themeAuto" id="themeAuto" value="themeAuto">
              <label for="themeAuto">Automatically change theme</label>
              <img class="settings__hint_icon" src="/img/icons/hint-icon.svg"/>
              <div class="settings__hint">You don't need to click submit button to apply theme changes. It's done automatically.</div>
           </div>
           <div class="settings__lang-block">
              <h3 class="settings__block-title">Language:</h3>
              <input type="checkbox" class="settings__lang">
           </div>
           <form class="settings__form-interaction">
              <div class="settings__name-block">
                 <label class="settings__label">
                 Name:<input type="name" name="name" class="settings__input settings__input_name" maxlength="22" placeholder="Enter new name">
                 <span class="settings__error_username"></span>
                 </label>
              </div>
              <div class="settings__decription-block">
                 <h3 class="settings__block-title">Profile description:</h3>
                 <textarea class="settings__description" name="description" maxlength="150" placeholder="Enter new description"></textarea>
                 <span class="settings__error_description"></span>
              </div>
        </div>
        <button type="submit" class="settings__submitInteraction open__post-btn" disabled>
        <div class="text_button">Save changes</div>
        </button>
        <span class="settings__error_submit"></span>
        </form>
        `;
    }
}

export default SettingsView;
