import dictionary from '../staticElements/dictionary';
import './style.scss';

class AddPostView {
    static renderAddPost() {
      const ln = dictionary[localStorage.lang];
        return `
        <div class="add__block">
        <div class="add__gradient">
           <form class="add__form">
              <p class="add__text">${ln.Step1}</p>
              <div class="drop-zone">
                 <div class="drop-zone__text-block">
                    <p class="drop-zone__text">${ln.DropImageHere}</p>
                    <p class="drop-zone__text">${ln.or}</p>
                    <input class="add__img" type="file" id="file" accept=".jpg,.jpeg,.png,.gif"/>
                    <label for="file" class="add__label">
                    <span>${ln.UploadYourImage}</span>
                    </label>
                    <p class="add__note">${ln.Note}</p>
                 </div>
              </div>
              <button class="add__delete open__post-btn" type="button">
                 <div class="text_button">${ln.DeleteImage}</div>
              </button>
              <p class="add__text">${ln.Step2}</p>
              <div class="add__description-block">
                 <textarea  class="add__description" name="myText" id="myTextarea" rows="1" placeholder="${ln.TypeHere}" maxlength="150"></textarea>
              </div>
              <p class="add__text">${ln.Step3}</p>
              <button type="button" class="add__post open__post-btn" disabled>
                 <div class="text_button">${ln.CreatePost}</div>
              </button>
           </form>
        </div>
     </div> 
        `;
    }

    static loader() {
        return `
        <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>`
    }
}

export default AddPostView;
