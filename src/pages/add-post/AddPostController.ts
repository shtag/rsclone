import model from '../../api/Model';
import { sessionId } from '../../types/constants';
import AddPostView from './AddPostView';

class AddPostController {
    static fileList: FileList;

    static image: string;

    static description: string;

    static async setAddPost() {
        const main = document.querySelector('main') as HTMLDivElement;
        main.innerHTML = AddPostView.renderAddPost();

        const addBtn = document.querySelector('.add__post') as HTMLButtonElement;
        const addImg = document.querySelector('.add__img') as HTMLInputElement;
        const addDescription = document.querySelector('.add__description') as HTMLTextAreaElement;
        const deleteBtn = document.querySelector('.add__delete') as HTMLButtonElement;
        const uploadBlock = document.querySelector('.drop-zone__text-block') as HTMLDivElement;
        const dropZone = document.querySelector('.drop-zone') as HTMLDivElement;

        addBtn.style.width = '160px';
        addBtn.style.padding = '12px';

        deleteBtn.style.display = 'none';
        deleteBtn.style.width = '160px';
        deleteBtn.style.padding = '12px';

        addImg.addEventListener('change', async () => {
            const img = await model.uploadPhoto(addImg.files as FileList);
            AddPostController.image = img.data.link;

            const dropZoneImg = document.createElement('img');
            dropZoneImg.classList.add('add__preview');
            dropZoneImg.src = AddPostController.image;
            dropZone.appendChild(dropZoneImg);

            uploadBlock.style.display = 'none';
            deleteBtn.style.display = 'block';
            addBtn.disabled = false;
        });

        deleteBtn.addEventListener('click', () => {
            dropZone.innerHTML = '';
        });

        addDescription.addEventListener('keyup', () => {
            addDescription.style.height = '1px';
            addDescription.style.height = `${addDescription.scrollHeight}px`;
        });

        addDescription.addEventListener('input', () => {
            AddPostController.description = addDescription.value;
        });

        addBtn.addEventListener('click', async () => {
            await model.post.create({ sessionId, image: AddPostController.image, description: AddPostController.description || '' });
        });

        AddPostController.dropzone();
        AddPostController.reloadPageAlert();
    }

    static async handleDrop(event: DragEvent) {
        const dropZone = document.querySelector('.drop-zone') as HTMLDivElement;
        const uploadBlock = document.querySelector('.drop-zone__text-block') as HTMLDivElement;
        const deleteBtn = document.querySelector('.add__delete') as HTMLButtonElement;
        const addBtn = document.querySelector('.add__post') as HTMLButtonElement;
        const form = document.querySelector('.add__form') as HTMLFormElement;

        event.preventDefault();
        dropZone.classList.remove('dragover');
        if (event.dataTransfer?.files?.length) {
            const file = event.dataTransfer.files[0];
            if (
                file.type.startsWith('image/') &&
                (file.name.endsWith('.jpeg') || file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.gif'))
            ) {
                const dropzoneImg = await model.uploadPhoto(event.dataTransfer.files as FileList);
                AddPostController.image = dropzoneImg.data.link;

                const img = document.createElement('img');
                img.classList.add('add__preview');
                img.src = URL.createObjectURL(file);
                dropZone.appendChild(img);
                addBtn.disabled = false;
                uploadBlock.style.display = 'none';
                deleteBtn.style.display = 'block';
                form.setAttribute('data-dirty', 'true');
            }
        }
    }

    static handleDragOver(event: DragEvent) {
        const dropZone = document.querySelector('.drop-zone') as HTMLDivElement;

        event.preventDefault();
        dropZone.classList.add('dragover');
    }

    static dropzone() {
        const dropZone = document.querySelector('.drop-zone') as HTMLDivElement;

        dropZone.addEventListener('dragover', AddPostController.handleDragOver);
        dropZone.addEventListener('drop', AddPostController.handleDrop);
    }

    static reloadPageAlert() {
        const form = document.querySelector('.add__form') as HTMLFormElement;
        form.addEventListener('input', () => {
            form.setAttribute('data-dirty', 'true');
        });

        form.addEventListener('submit', () => {
            form.removeAttribute('data-dirty');
        });

        window.addEventListener('beforeunload', (e) => {
            if (form && form.hasAttribute('data-dirty')) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }
}

export default AddPostController;