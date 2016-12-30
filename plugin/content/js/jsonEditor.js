require('../css/jsonEditor.css');
import { helpers } from './helpers';

export class JsonEditor {

    closeEditor() {
        this.parent.replaceChild(this.oldKeyElement, this.keyInput);
        this.parent.replaceChild(this.oldValueElement, this.valueInput);
        this.parent.classList.remove('jp-is-editing');
        this.parent.classList.remove('jp-is-valid-value');
    }

    validateInputs() {
        // if parentObject is undefined, it means that this is the root, and key will always be an empty string
        const isRoot = typeof this.parentObject === 'undefined';
        this.isValid = isRoot || this.valueInput.value !== '' && this.keyInput.value.trim() !== '';
        this.isValid = this.isValid && (this.originalKey === this.keyInput.value || !this.parentObject.hasOwnProperty(this.keyInput.value));
        this.isValid = this.isValid && (!isRoot || isRoot && helpers.isValidJson(this.valueInput.value));

        this.parent.classList[ this.isValid ? 'add' : 'remove' ]('jp-is-valid-value');
    }

    editObject(key, value, keyElement, valueElement) {
        this.isValid = true;
        this.originalKey = key;
        this.newValue = typeof value === 'object' ? JSON.stringify(value) : value;
        if(typeof value === 'string' && value.charAt(0) === '"' && value.charAt(value.length-1) === '"')
            this.newValue = this.newValue.substr(1, this.newValue.length-2);

        this.oldKeyElement = keyElement;
        this.oldValueElement = valueElement;

        this.keyInput = document.createElement('input');
        this.keyInput.className = 'jp-editor-input jp-editor-key';
        this.keyInput.setAttribute('type', 'text');
        this.keyInput.value = key;
        this.keyInput.setAttribute('placeholder', 'Key');

        if(!this.parentObject || this.parentObject.constructor === Array) {
            this.keyInput.disabled = true;
        }

        this.valueInput = document.createElement('textarea');
        this.valueInput.className = 'jp-editor-input jp-editor-value';
        this.valueInput.value = this.newValue;
        this.valueInput.setAttribute('placeholder', 'Value');

        this.parent.classList.add('jp-is-editing');
        this.parent.classList.add('jp-is-valid-value');
        this.parent.replaceChild(this.keyInput, this.oldKeyElement);
        this.parent.replaceChild(this.valueInput, this.oldValueElement);

        this.valueInput.style.height = this.valueInput.scrollHeight;

        return new Promise((resolve, reject) => {

            this.parent.querySelector('.jp-cancel-editing-btn').onclick = (e) => {
                e.stopPropagation();
                this.closeEditor();
                if(this.parentObject && this.parentObject.constructor === Array) {
                    this.parentObject.splice(key, 0, value);
                } else {
                    if(this.parentObject)
                        this.parentObject[key] = value;
                }

                reject();
            };

            this.valueInput.onkeyup = this.validateInputs.bind(this);
            this.valueInput.onchange = this.validateInputs.bind(this);
            this.valueInput.onfocus = this.validateInputs.bind(this);
            this.valueInput.onpaste = this.validateInputs.bind(this);
            this.keyInput.onkeyup = this.validateInputs.bind(this);
            this.keyInput.onchange = this.validateInputs.bind(this);
            this.keyInput.onfocus = this.validateInputs.bind(this);
            this.keyInput.onpaste = this.validateInputs.bind(this);

            this.parent.querySelector('.jp-done-editing-btn').onclick = (e) => {
                e.stopPropagation();
                if(!this.isValid) return;

                this.closeEditor();

                let newValue;
                try {
                    newValue = JSON.parse(this.valueInput.value);
                } catch (e) {
                    newValue = this.valueInput.value;
                }

                if(this.keyInput.value !== key)
                    delete this.parentObject[key];

                if(this.parentObject)
                    this.parentObject[this.keyInput.value] = newValue;
                else
                    this.parent = newValue;

                resolve({ key: this.keyInput.value, value: newValue });
            };

        });
    }

    constructor(parent, parentObject) {
        this.parent = parent;
        this.parentObject = parentObject;
    }

}