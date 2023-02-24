import model from "./api/Model";

async function checkSession(): Promise<boolean> {
    const session = await model.auth.checkSession({ id: +localStorage.userId, sessionId: localStorage.sessionId });
    if (!localStorage.sessionId || localStorage.sessionId === '' || !session.sessionActive) {
        return false;
    }
    return true
}

function resetInputs(input: NodeListOf<HTMLInputElement>) {
    const inp = [...input]
    for (let i = 0; i < inp.length; i += 1) {
        (inp[i] as HTMLInputElement).value = ''
    }
}

export { checkSession, resetInputs };
