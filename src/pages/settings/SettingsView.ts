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
              <div class="lang-menu">
                 <div class="settings__lang">
                    <img class="settings__lang-flag" src="https://i.postimg.cc/65L8YXnf/640px-Flag-of-the-United-Kingdom-3-5-svg.png"/>
                    <p class="settings__lang-text">English</p>
                 </div>
                 <div class="settings__lang-items">
                    <div class="settings__lang-item">
                       <img class="settings__en settings__lang-flag" src="https://i.postimg.cc/65L8YXnf/640px-Flag-of-the-United-Kingdom-3-5-svg.png"/>
                       <p class="setting__lang-name">English</p>
                    </div>
                    <div class="settings__lang-item">
                       <img class="settings__uk settings__lang-flag" src="https://i.postimg.cc/SKL9bZ7x/1200px-Flag-of-Ukraine-svg.png"/>
                       <p class="setting__lang-name">Українська</p>
                    </div>
                    <div class="settings__lang-item">
                       <img class="settings__bl settings__lang-flag" src="https://i.postimg.cc/MHPtRSfZ/a3.png"/>
                       <p class="setting__lang-name">Беларуская</p>
                    </div>
                    <div class="settings__lang-item">
                       <img class="settings__pl settings__lang-flag" src="https://i.postimg.cc/tJNGH7cS/pl.png"/>
                       <p class="setting__lang-name">Polski</p>
                    </div>
                 </div>
              </div>
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
        <div class="settings__btns">
        <button type="submit" class="settings__submitInteraction open__post-btn" disabled>
        <div class="text_button">${ln.SaveChanges}</div>
        </button>
        <span class="settings__error_submit"></span>
        <button type="button" class="settings__logOut open__post-btn">
        <div class="text_button">${ln.LogOut}</div>
        </button>
        <img class="settings__deleteAccount" src="/img/icons/delete-account.png" alt="delete-account" />
        </div>
        </form>
        `;
    }
}

export default SettingsView;

// <input type="checkbox" class="settings__lang">
