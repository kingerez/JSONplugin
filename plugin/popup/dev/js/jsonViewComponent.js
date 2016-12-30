import { JSONtoHTML } from '../../../content/js/jsonToHtml';

export const jsonViewComponent = {

    controller: class {

        constructor($scope, $element) {

            this.jsonHtml = undefined;
            this.content = $element[0].querySelector('.json-to-html');
            this.scrollParent = $element[0].parentNode;

            $scope.$watch(() => this.jsonText, () => {
                if(this.jsonText && this.jsonText !== '') {
                    this.jsonHtml = new JSONtoHTML(this.jsonText);
                    this.content.innerHTML = '';
                    this.content.appendChild(this.jsonHtml.root);
                }
            });

        }

    },

    bindings: {
        jsonText: '@'
    },

    template: `<div class="json-viewer jp-dark-theme jp-noselect">
        <div class="json-to-html"></div>
        <scrollbar scrollable="$ctrl.content" parent="$ctrl.scrollParent"></scrollbar>
    </div>`

};