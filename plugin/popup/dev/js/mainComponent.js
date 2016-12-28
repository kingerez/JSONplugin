require('../css/main.css');

export const mainComponent = {

    controller: class {

        constructor($rootScope) {

            this.slide = 0;
            this.jsonString = undefined;

            $rootScope.$on('nextSlide', (event, jsonString) => {
                this.jsonString = jsonString;
                this.slide++;
            });

        }

    },

    template: `
        <div class="popup-top">
            <img class="plugin-icon" src="../../../images/icon.png" />
            <div style="clear: both"></div>
        </div>
        <div class="popup-body show-slide-{{ $ctrl.slide }}">
            <div class="slide slide0">
                <json-parser></json-parser>
            </div>
            <div class="slide slide1">
                <json-view json-text="{{ $ctrl.jsonString }}"></json-view>
            </div>
        </div>
    `

};