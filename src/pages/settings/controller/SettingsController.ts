import CredentialsController from "./CredentialsController";
import InteractionController from "./InteractionController";

class SettingsController {
    static generalCredentialsController() {
        CredentialsController.changeUserCredentials()
        InteractionController.changeSettingsTheme()
    }
}
export default SettingsController;