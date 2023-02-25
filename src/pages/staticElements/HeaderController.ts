import postElemens from "../home-page/postElements/postElemensView";
import HeaderView from "./HeaderView";

class HeaderController {
    static switchTheme() {
        const toggle = document.querySelector('.theme') as HTMLInputElement;
        const root = document.querySelector('body') as HTMLBodyElement;
        
        function setTheme(value: string) {
          localStorage.setItem('theme', value);
          if (value === 'light') {
            root.classList.add('light-theme');
            toggle.checked = true;
          } else {
            root.classList.remove('light-theme');
            toggle.checked = false;
          }
        }
        
        function handleColorSchemeChange(e: MediaQueryListEvent) {
          if (e.matches) {
            setTheme('light');
          } else {
            setTheme('dark');
          }
        }
        
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
        colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        } else if (colorSchemeQuery.matches) {
          setTheme('light');
        }
        
        toggle.addEventListener('click', () => {
          if (toggle.checked) {
            setTheme('light');
          } else {
            setTheme('dark');
          }
        });
      }
      

    static loaderControlAnimation() {
        window.onload = () => {
            const body = document.querySelector('body') as HTMLBodyElement;
            body.classList.remove('preload');
        };
    }


    static openLikedPosts(){
      const btn = document.querySelector('.likes-btn') as HTMLElement;      
      btn.addEventListener('click', () => {
        const container = document.querySelector('.liked_container') as HTMLElement;
        if (container) {
          container.remove();
        } else {
          HeaderView.renderLikedPostsContainer();
        }
      })
    }

    
}

export default HeaderController;
