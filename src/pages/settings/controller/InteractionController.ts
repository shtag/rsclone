import confetti from 'canvas-confetti';

import model from '../../../api/Model';
import Router from '../../../router';
import { checkSession } from '../../../types/functions';

class InteractionController {
    static language: string;

    static userName: string;

    static description: string;

    static changeSettingsLang(submitBtn: HTMLButtonElement) {
        const submit = submitBtn;

        const langMenu = document.querySelector('.settings__lang') as HTMLDivElement;
        const langItems = document.querySelector('.settings__lang-items') as HTMLUListElement;
        const langItem = document.querySelectorAll('.settings__lang-item') as NodeListOf<Element>;
        const flag = document.querySelector('.settings__lang-flag') as HTMLImageElement;
        const langText = document.querySelector('.settings__lang-text') as HTMLParagraphElement;

        langMenu.addEventListener('click', () => {
            langItems.classList.toggle('settings__lang-items_open');
        });

        langItem.forEach((item) => {
            item.addEventListener('click', (e: Event) => {
                const target = e.target as Element;

                if (target.innerHTML === 'English' || target.className === 'settings__en settings__lang-flag') {
                    localStorage.setItem('lang', 'en');
                    langText.innerText = 'English';
                    flag.src = 'https://i.postimg.cc/65L8YXnf/640px-Flag-of-the-United-Kingdom-3-5-svg.png';
                } else if (target.innerHTML === 'Український' || target.className === 'settings__uk settings__lang-flag') {
                    localStorage.setItem('lang', 'uk');
                    langText.innerText = 'Український';
                    flag.src = 'https://i.postimg.cc/SKL9bZ7x/1200px-Flag-of-Ukraine-svg.png';
                } else if (target.innerHTML === 'Беларуская' || target.className === 'settings__bl settings__lang-flag') {
                    localStorage.setItem('lang', 'bl');
                    langText.innerText = 'Беларуская';
                    flag.src = 'https://i.postimg.cc/tJNGH7cS/pl.png';
                } else if (target.innerHTML === 'Polski' || target.className === 'settings__pl settings__lang-flag') {
                    localStorage.setItem('lang', 'pl');
                    langText.innerText = 'Polski';
                    flag.src = 'https://i.postimg.cc/MHPtRSfZ/a3.png';
                }
                langItems.classList.remove('settings__lang-items_open');
            });
            submit.disabled = false;
        });

        switch (localStorage.getItem('lang')) {
            case 'en':
                langText.innerText = 'English';
                flag.src = 'https://i.postimg.cc/65L8YXnf/640px-Flag-of-the-United-Kingdom-3-5-svg.png';
                break;
            case 'uk':
                langText.innerText = 'Український';
                flag.src = 'https://i.postimg.cc/SKL9bZ7x/1200px-Flag-of-Ukraine-svg.png';
                break;

            case 'bl':
                langText.innerText = 'Беларуская';
                flag.src = 'https://i.postimg.cc/tJNGH7cS/pl.png';
                break;

            case 'pl':
                langText.innerText = 'Polski';
                flag.src = 'https://i.postimg.cc/MHPtRSfZ/a3.png';
                break;

            default:
                langText.innerText = 'English';
                flag.src = 'https://i.postimg.cc/65L8YXnf/640px-Flag-of-the-United-Kingdom-3-5-svg.png';
                break;
        }
    }

    static changeSettingsName(submitBtn: HTMLButtonElement) {
        const userName = document.querySelector('.settings__input_name') as HTMLInputElement;
        const errorMessage = document.querySelector('.settings__error_username') as HTMLSpanElement;
        const submit = submitBtn;

        userName.addEventListener('input', () => {
            const usernameRegex = /^[a-zA-Z0-9_а-яА-Я\s]{3,20}$/;

            if (usernameRegex.test(userName.value) || userName.value === '') {
                InteractionController.userName = userName.value;
                errorMessage.innerText = '';
                submit.disabled = false;
            } else {
                errorMessage.innerText = 'Invalid username';
            }
        });
    }

    static changeSettingsDescription(submitBtn: HTMLButtonElement) {
        const description = document.querySelector('.settings__description') as HTMLTextAreaElement;
        const errorMessage = document.querySelector('.settings__error_description') as HTMLSpanElement;
        const submit = submitBtn;

        description.addEventListener('input', (e: Event) => {
            const descriptionText = (e.target as HTMLTextAreaElement).value;

            const badWords = [
                'fuck',
                'asshole',
                'блять',
                'сука',
                'шлюха',
                'shit',
                'pussy',
                'ass',
                'пидарас',
                'ниггер',
                'конча',
                'нига',
                'nigga',
                'niggas',
                'nigger',
                'хохлы',
                'хохол',
                'жид',
                'хач',
                'cunt',
            ];

            const words = descriptionText.toLowerCase().split(' ');
            const isValid = words.every((word: string) => !badWords.includes(word));

            if (isValid) {
                errorMessage.textContent = '';
                InteractionController.description = descriptionText;
                submit.disabled = false;
            } else {
                errorMessage.textContent = 'Invalid description';
            }
        });
    }

    static async changeUserInteraction(sessionId: string, userId: string) {
        const submitBtn = document.querySelector('.settings__submitInteraction') as HTMLButtonElement;
        const formInteraction = document.querySelector('.settings__form-interaction') as HTMLFormElement;
        const hintIcon = document.querySelector('.settings__hint_icon') as HTMLImageElement;
        const hint = document.querySelector('.settings__hint') as HTMLDivElement;

        InteractionController.changeSettingsLang(submitBtn);
        InteractionController.changeSettingsName(submitBtn);
        InteractionController.changeSettingsDescription(submitBtn);

        submitBtn.addEventListener('click', async (e: Event) => {
            e.preventDefault();
            await model.user.changeSettings(+userId, {
                sessionId,
                settings: {
                    language: InteractionController.language,
                    name: InteractionController.userName,
                    descriptionProfile: InteractionController.description,
                },
            });

            confetti({
                particleCount: 400,
                startVelocity: 90,
                spread: 360,
            });

            const user = document.querySelector('.user');
            user?.remove();
            Router.handleLocation();

            submitBtn.disabled = true;
            formInteraction.reset();
        });

        InteractionController.settingsLogOut(userId, sessionId);
        InteractionController.settingsDeleteAccount(userId, sessionId);
    }

    static settingsLogOut(userId: string, sessionId: string) {
        const logOutBtn = document.querySelector('.settings__logOut') as HTMLButtonElement;

        logOutBtn.addEventListener('click', async () => {
            if (await checkSession()) {
                await model.auth.logout({ sessionId, id: +userId });
            }

            localStorage.removeItem('sessionId');
            localStorage.removeItem('userId');
            Router.handleLocation();
        });
    }

    static settingsDeleteAccount(userId: string, sessionId: string) {
        const deleteAccountBtn = document.querySelector('.settings__deleteAccount') as HTMLImageElement;

        deleteAccountBtn.addEventListener('click', async () => {
            if (await checkSession()) {
                await model.user.delete(+userId, sessionId);
            }
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userId');
            window.history.pushState({}, '', '/login');

            Router.handleLocation();
        });
    }
}

export default InteractionController;
