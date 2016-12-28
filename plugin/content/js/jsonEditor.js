require('../css/jsonEditor.css');

export class JsonEditor {

    closeEditor() {
        this.editor.classList.add('jp-editor-closed');
    }

    editObject(key, value) {
        const jsonValue = typeof value === 'object' ? JSON.stringify(value) : value;

        if(key === '') {
            this.keyInput.disabled = true;
            this.keyInput.classList.add('jp-disabled');
            this.keyInput.value = 'JSON root';
        } else {
            this.keyInput.disabled = false;
            this.keyInput.classList.remove('jp-disabled');
        }

        this.editor.classList.add('jp-editor-rendering');
        this.editor.classList.remove('jp-editor-closed');
        this.keyInput.value = key;
        this.valueInput.value = jsonValue;

        var editorClientRect = this.editor.querySelector('.jp-json-editor-inner').getBoundingClientRect();
        var valueClientRect = this.valueInput.getBoundingClientRect();

        var startX = valueClientRect.left - editorClientRect.left;
        var widthLeft = editorClientRect.width - startX;
        widthLeft = Math.floor(widthLeft - 11);
        this.valueInput.style.width = widthLeft + 'px';
        this.valueInput.style.height = this.valueInput.scrollHeight;

        this.doneButton.classList.add('jp-enabled');

        return new Promise((resolve, reject) => {
            this.editor.classList.remove('jp-editor-rendering');

            this.closeButton.onclick = () => {
                this.closeEditor();
                reject();
            };

            this.doneButton.onclick = () => {
                try {
                    JSON.parse(this.valueInput.value);
                    this.closeEditor();
                    resolve(key, this.valueInput.value);
                } catch (e) {}
            };
        });
    }

    constructor(parent) {
        this.parent = parent;

        this.editor = document.createElement('div');
        this.editor.className = 'jp-json-editor jp-editor-closed';

        this.editor.innerHTML = `
            <div class="jp-json-editor-inner">
                <i class="fa fa-close jp-close-button"></i>
                <input type="text" 
                       class="jp-editor-input jp-editor-input-key" 
                       placeholder="New key" />
                    <span class="jp-editor-separator">:</span>
                    <textarea class="jp-editor-input jp-editor-input-value" placeholder="New value"></textarea>
                <div class="jp-editor-bottom">
                    <div class="jp-editor-done-btn"><span>Done!</span><i class="fa fa-check"></i></div>
                </div>
            </div>
        `;

        parent.appendChild(this.editor);

        this.keyInput = this.editor.querySelector('.jp-editor-input-key');
        this.valueInput = this.editor.querySelector('.jp-editor-input-value');
        this.closeButton = this.editor.querySelector('.jp-close-button');
        this.doneButton = this.editor.querySelector('.jp-editor-done-btn');
    }

}