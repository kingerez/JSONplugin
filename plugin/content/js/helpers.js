import { isURL } from 'validator';

export const helpers = {

    getType(obj) {
        if(obj.constructor == Array)
            return 'array';

        return typeof obj;
    },

    getTypeName(type) {
        switch (type) {
            case 'object': return 'Object';
            case 'array': return 'Array';
            default: return '';
        }
    },

    getImmediateSibling(el) {
        const parent = el.parentNode;
        for(let i=0; i<parent.childElementCount; i++) {
            if(parent.children[i] === el) {
                return parent.children[i + 1];
            }
        }
    },

    getPreviousNode(el) {
        const parent = el.parentNode;
        const siblings = parent.children;

        for(let i=0; i<siblings.length; i++) {
            if(siblings[i] === el)
                return siblings[i - 1];
        }
    },

    getParentNode(el) {
        const parent = el.parentNode; // get the ol element
        const uncles = parent.parentNode.children;

        for(let i=0; i<uncles.length; i++) {
            if(uncles[i] === parent) {
                return uncles[i-1]; // since an ol is always preceded by a li, this will return the li
            }
        }
    },

    copyTextToClipboard(object) {
        if(typeof object === 'object') {
            object = JSON.stringify(object);
        }

        var copyFrom = document.createElement("textarea");
        copyFrom.textContent = object;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        body.removeChild(copyFrom);
    },

    isValidJson(string) {
        if(typeof string !== 'string') return false;

        try {
            JSON.parse(string);
            return true;
        } catch (e) {
            return false;
        }
    },

    isValidURL(string) {
        if(typeof string !== 'string') return false;

        return isURL(string, {
            allow_underscores: true,
            allow_trailing_dot: true,
            allow_protocol_relative_urls: true
        });
        return false
    },

    getLinkType(link) {
        return new Promise((resolve, reject) => {
            if(link.charAt(0) === '"')
                link = link.substr(1);
            if(link.charAt(link.length-1) === '"')
                link = link.substr(0, link.length-1);

            if(link.indexOf('//') === 0 && document.location.protocol.indexOf('http') < 0)
                link = 'http:' + link;

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    xhr.status === 200 && resolve(xhr);
                    xhr.status !== 200 && reject(xhr);
                }
            };

            xhr.open('GET', link, true);
            xhr.send()
        });
    }

};