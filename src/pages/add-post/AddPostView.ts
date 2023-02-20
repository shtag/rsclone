import './style.scss';

class AddPostView {
    static renderAddPost() {
        return `
        <div class="add__block">
        <div class="add__gradient">
           <form class="add__form">
              <p class="add__text">Step 1: Upload your image</p>
              <div class="drop-zone">
                 <div class="drop-zone__text-block">
                    <p class="drop-zone__text">Drop image here</p>
                    <p class="drop-zone__text">or</p>
                    <input class="add__img" type="file" id="file" accept=".jpg,.jpeg,.png,.gif"/>
                    <label for="file" class="add__label">
                    <span>Upload your image</span>
                    </label>
                    <p class="add__note">Note: Please use jpg/png/gif formats.</p>
                 </div>
              </div>
              <button class="add__delete open__post-btn">
                 <div class="text_button">Delete image</div>
              </button>
              <p class="add__text">Step 2: Add your description</p>
              <div class="add__description-block">
                 <textarea  class="add__description" name="myText" id="myTextarea" rows="1" placeholder="Type here..." maxlength="150"></textarea>
              </div>
              <p class="add__text">Step 3: Click the button below to create a post</p>
              <button class="add__post open__post-btn" disabled>
                 <div class="text_button">Create post</div>
              </button>
           </form>
        </div>
     </div> 
        `;
    }
}

export default AddPostView;
