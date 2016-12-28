require('../css/jsonParser.css');

export const jsonParserComponent = {

    controller: class {

        constructor($rootScope) {
            this.$rootScope = $rootScope;

            this.text = '';
            this.jsonResult = '';
            this.isJSON = false;
            this.validJsonIcon = '';
        }

        onTextChange() {
            // test for JSON
            if(this.text.trim() === '') {
                this.isJSON = false;
                this.jsonResult = '';
            }

            try {
                JSON.parse(this.text);
                this.isJSON = true;
                this.jsonResult = 'Valid JSON!';
            } catch (e) {
                this.jsonResult = e.message;
                this.isJSON = false;
            }
        }

        nextSlide() {
            this.$rootScope.$emit('nextSlide', this.text);
        }

    },

    template: `
        <div class="json-parser-container" ng-class="{ 'is-valid-json': $ctrl.isJSON, 'is-invalid-json': !$ctrl.isJSON }">
            <textarea class="json-parser-text" placeholder="Paste a JSON string here" ng-model="$ctrl.text" ng-change="$ctrl.onTextChange()"></textarea>
            <div class="json-result">
                <span>{{ $ctrl.jsonResult }}</span>
                <i class="fa json-state-indicator" ng-class="{ 'fa-check': $ctrl.isJSON, 'fa-close': !$ctrl.isJSON && $ctrl.jsonResult.trim() !== '' }"></i>
            </div>
            <div class="base-button continue-button" ng-click="$ctrl.nextSlide()">Continue</div>
        </div>
    `

};