import confetti from 'canvas-confetti';

import model from '../../../api/Model';
import Router from '../../../router';

class InteractionController {
    static language: string;

    static userName: string;

    static description: string;

    static changeSettingsTheme() {
        const autoTheme = document.querySelector('.settings__theme') as HTMLInputElement;

        autoTheme.addEventListener('click', () => {
            if (autoTheme.checked) {
                localStorage.setItem('autoTheme', 'true');
            } else {
                localStorage.removeItem('autoTheme');
            }
        });

        if (localStorage.getItem('autoTheme') === 'true') {
            autoTheme.checked = true;
        }
    }

    static changeSettingsLang(submitBtn: HTMLButtonElement) {
        const langToggle = document.querySelector('.settings__lang') as HTMLInputElement;
        const submit = submitBtn;

        langToggle.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                InteractionController.language = 'uk';
                localStorage.setItem('lang', 'uk');
            } else {
                InteractionController.language = 'en';
                localStorage.setItem('lang', 'en');
            }
            submit.disabled = false;
        });

        if (localStorage.getItem('lang') === 'uk') {
            langToggle.checked = true;
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

        InteractionController.changeSettingsTheme();
        InteractionController.changeSettingsLang(submitBtn);
        InteractionController.changeSettingsName(submitBtn);
        InteractionController.changeSettingsDescription(submitBtn);

        hintIcon.addEventListener('click', () => {
            hint.classList.toggle('settings__hint_open');
        });

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
    }
}

export default InteractionController;
