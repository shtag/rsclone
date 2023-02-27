import './scss/styles.scss';
import './pages/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'

import Router from './router';
import PageController from './pages/PageController';
import HeaderController from './pages/staticElements/HeaderController';
import { checkSession } from './types/functions';
import { state } from './pages/home-page/postElements/postElementsController';
import model from './api/Model';
import GeneralUserController from './pages/user-profile/UserProfileController';
import search from './pages/staticElements/search/searchPopupController';

class App {
    static async start() {
        console.log('start');
        // localStorage.setItem('sessionId', sessionId);
        // localStorage.setItem('userId', '1');
        if (await checkSession()) {
            state.user = await model.user.get(+localStorage.userId);
        }
        Router.setEventListeners();
        PageController.setEventListener();
        HeaderController.loaderControlAnimation();
        HeaderController.setListeners();
        GeneralUserController.setListeners();
        setTimeout(() => {
            search.setBodyListeners()
        }, 500);
    }
}

App.start();
