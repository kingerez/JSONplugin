const singlePageJSON = (() => {

    let container;

    function renderFonts() {
        const style = document.createElement('style');

        const eot = chrome.extension.getURL('content/fonts/fontawesome-webfont.eot?v=4.7.0');
        const woff2 = chrome.extension.getURL('content/fonts/fontawesome-webfont.woff2');
        const woff = chrome.extension.getURL('content/fonts/fontawesome-webfont.woff');
        const ttf = chrome.extension.getURL('content/fonts/fontawesome-webfont.ttf');
        const svg = chrome.extension.getURL('content/fonts/fontawesome-webfont.svg');

        style.innerText = `
            @font-face{
                font-family:'FontAwesome';
                src:url('${ eot }');
                src:url('${ eot }?#iefix&v=4.7.0') format('embedded-opentype'),
                url('${ woff2 }?v=4.7.0') format('woff2'),
                url('${ woff }?v=4.7.0') format('woff'),
                url('${ ttf }?v=4.7.0') format('truetype'),
                url('${ svg }?v=4.7.0#fontawesomeregular') format('svg');
                font-weight:normal;
                font-style:normal
            }`;
        document.querySelector('head').appendChild(style);
    }

    function createContainer() {
        container = document.createElement('div');
        container.className = 'jp-json-container';
        document.body.appendChild(container);

        const template = `
            <div class="jp-top-bar">
                <img class="jp-top-bar-logo" src="${ chrome.extension.getURL('images/icon.png') }" />
            </div>
            <div class="jp-body"></div>
        `;

        container.innerHTML = template;
    }

    function renderNode(key, value) {
        const valueType = helpers.getType(value);
        const valueClass = 'jp-json-type-' + valueType;

        const el = document.createElement('div');
        el.className = 'jp-json-node ' + valueClass;
        el.innerHTML = `
            <i class="fa fa-caret-right jp-json-caret jp-json-caret-closed"></i>
        `;

        return el;
    }

    function jsonToHtml(key, value) {
        if(!value && key !== undefined) {
            value = key;
            key = undefined;
        }

        const valueType = helpers.getType(value);
        const valueClass = 'jp-json-type-' + valueType;
        const typeName = helpers.getTypeName(valueType);
        

        // const el = document.createElement('div');
        // el.className = 'jp-json-object';
        // el.appendChild(renderNode(key, value));
        // return el;
    }
    
    return {
        renderPage: function (jsonObject) {
            document.body.classList.add('is-one-big-json');
            renderFonts();

            const numElements = document.body.childElementCount;
            for(let i=0; i<numElements; i++) {
                const el = document.body.children[i];
                const currentDisplayValue = getComputedStyle(el).display;
                el.setAttribute('data-old-display', currentDisplayValue);
                el.style.display = 'none';
            }

            createContainer();
            const jsonHtml = jsonToHtml(null, jsonObject);
            container.querySelector('.jp-body').appendChild(jsonHtml);
        }
    };

})();