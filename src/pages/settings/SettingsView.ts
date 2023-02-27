import dictionary from '../staticElements/dictionary';
import './style.scss';

class SettingsView {
    static renderSettings() {
      const ln = dictionary[localStorage.lang];
        return `
        <img class="settings__icon" src="/img/icons/settings-icon.png"/>
        <form class="settings__form-credentials">
           <div class="settings__credentials">
              <h2 class="settings__subtitle">${ln.UserCredentials}</h2>
              <label class="settings__label">
              ${ln.Login}:<input type="text" name="login" class="settings__input settings__input_login" placeholder="${ln.EnterNewLogin}">
              <span class="settings__error"></span>
              </label>
              <label class="settings__label">
              ${ln.Password}:<input type="password" name="password" class="settings__input settings__input_password" placeholder="${ln.EnterNewPassword}">
              <span class="settings__error_password"></span>
              </label>
           </div>
           <button type="submit" class="settings__submitCredentials open__post-btn" disabled>
              <div class="text_button">${ln.SaveChanges}</div>
           </button>
        </form>
        <div class="settings__interaction">
           <h2 class="settings__subtitle">${ln.UserInteraction}</h2>
           <div class="settings__lang-block">
              <h3 class="settings__block-title">${ln.Language}:</h3>
              <input type="checkbox" class="settings__lang">
           </div>
           <form class="settings__form-interaction">
              <div class="settings__name-block">
                 <label class="settings__label">
                 ${ln.Name}:<input type="name" name="name" class="settings__input settings__input_name" maxlength="22" placeholder="${ln.EnterNewName}">
                 <span class="settings__error_username"></span>
                 </label>
              </div>
              <div class="settings__decription-block">
                 <h3 class="settings__block-title">${ln.ProfileDecription}:</h3>
                 <textarea class="settings__description" name="description" maxlength="150" placeholder="${ln.EnterNewDecription}"></textarea>
                 <span class="settings__error_description"></span>
              </div>
        </div>
        <button type="submit" class="settings__submitInteraction open__post-btn" disabled>
        <div class="text_button">${ln.SaveChanges}</div>
        </button>
        <span class="settings__error_submit"></span>
        </form>
        `;
    }
}

export default SettingsView;
