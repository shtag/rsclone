import CredentialsController from './CredentialsController';
import InteractionController from './InteractionController';

class SettingsController {
    static async generalCredentialsController () {
        const sessionId = localStorage.getItem('sessionId') as string;
        const userId = localStorage.getItem('userId') as string;

        CredentialsController.changeUserCredentials(sessionId, userId);
        InteractionController.changeUserInteraction(sessionId, userId);
    }
}
export default SettingsController;
