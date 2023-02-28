import './loaders.scss'

class LoadersView {
    static add() {
        return `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
    }

    static addGlobal() {
        return `
        <div class="global_loader">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>`
    }

    static removeGlobal() {
        const loader = document.querySelector('.global_loader');
        loader?.remove();
    }

    static center() {
        const loader = document.querySelectorAll('.lds-ring') as NodeListOf<HTMLElement>;
        loader.forEach(el => {
            el.parentElement?.classList.add('flex_center');
        })
    }

    static remove(parent: HTMLElement) {
        const loader = parent.querySelector('lds-ring') as HTMLElement;
        if (loader) {

            loader.parentElement?.classList.remove('flex_center');
            loader.remove();
        }
    }
}

export default LoadersView;