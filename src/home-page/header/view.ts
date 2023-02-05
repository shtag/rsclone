export class Header {
    static renderProducts() {
        const root = document.querySelector('body') as HTMLBodyElement;
        let HTMLHeader = '';
        HTMLHeader = `
            <header class="header">
            <div class="logo-header_container"><img class="logo-header" src="assets/img/Logo.png" alt=""></div> 
    <div class="header-bar_container">
        <button class="create_post-btn"><img src="assets/img/post.svg" alt="" class="create_post-img"></button>
        <button class="likes-btn"><img src="assets/img/like.svg" alt="" class="likes-img"></button>
        <button class="profile-btn"></button>
    </div>
            </header>
            `;
        root.innerHTML = HTMLHeader;
    }
}

export default Header;
