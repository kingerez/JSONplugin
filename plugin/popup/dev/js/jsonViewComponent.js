import { JSONtoHTML } from '../../../content/js/jsonToHtml';

export const jsonViewComponent = {

    controller: class {

        constructor($scope, $element) {

            this.jsonHtml = undefined;

            $scope.$watch(() => this.jsonText, () => {
                if(this.jsonText && this.jsonText !== '') {
                    this.jsonHtml = new JSONtoHTML(this.jsonText);
                    const targetElement = $element[0].querySelector('.json-to-html');
                    targetElement.innerHTML = '';
                    targetElement.appendChild(this.jsonHtml.root);
                }
            });

        }

    },

    bindings: {
        jsonText: '@'
    },

    template: `<div class="json-viewer jp-dark-theme">
        <div class="json-to-html"></div>
    </div>`

};