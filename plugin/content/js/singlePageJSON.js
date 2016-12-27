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

    function jsonToHtml(key, value) {
        const valueType = helpers.getType(value);
        const valueClass = 'jp-json-type-' + valueType;

        let typeName = helpers.getTypeName(valueType);
        let separator = key !== null ? ':&nbsp;' : '';

        let content;

        key = key || '';

        switch (valueType) {
            case 'object':
            case 'array':
                if(valueType === 'array') {
                    typeName += '[' + value.length + ']';
                }

                content = `
                    <i class="fa fa-caret-down jp-json-caret"></i>
                    <span class="jp-object-name jp-reg-text">${ key }</span>
                    <span class="jp-object-name-separator jp-reg-text">${ separator }</span>
                    <span class="jp-object-type jp-reg-text">${ typeName }</span>
                    <ol class="jp-ol jp-object-children">`;
                    for(let v in value) {
                        content += jsonToHtml(v, value[v]);
                    }
                    content += `</ol>`;
                break;

            default:
                content = `
                    <i class="fa fa-caret-down jp-json-transparent-caret"></i>
                    <span class="jp-var-name jp-reg-text">${ key }</span>
                    <span class="jp-var-name-separator jp-reg-text">:&nbsp;</span>
                    <span class="jp-var-value jp-reg-text">${ value }</span>
                `;
                break;
        }

        let template = `<li class="jp-class-${ valueType }">${ content }</li>`;

        return template;
    }
    
    return {
        renderPage: function (jsonObject) {
            console.log(jsonObject)
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

            container.querySelector('.jp-body').innerHTML = `
                <ol class="jp-ol jp-parent-object">
                    ${ jsonHtml }
                </ol>
            `
        }
    };

})();