import { JSONtoHTML } from '../../../content/js/jsonToHtml';

export const jsonViewComponent = {

    controller: class {

        constructor($scope) {

            this.jsonHtml = undefined;

            $scope.$watch(() => this.jsonText, () => {
                if(this.jsonText && this.jsonText !== '') {
                    this.jsonHtml = new JSONtoHTML(this.jsonText);
                }
            });

        }

    },

    bindings: {
        jsonText: '@'
    },

    template: `<div class="json-viewer">

    </div>`

};