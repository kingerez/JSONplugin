require('../css/main.css');

export const mainComponent = {

    controller: class {

        constructor($rootScope) {

            this.slide = 0;
            this.lastSlide = 1;
            this.nextArrowState = false;
            this.prevArrowState = false;
            this.jsonString = undefined;

            $rootScope.$on('jsonInputChanged', (event, result) => {
                this.canOpenInNewWindow = result.isValidJson;
                if(result.isValidJson) {
                    this.jsonString = result.json;
                } else {
                    this.jsonString = undefined;
                }

                this.setNextArrowState();
                this.setPrevArrowState();
            });

        }

        setNextArrowState() {
            if(this.slide === this.lastSlide) {
                return this.nextArrowState = false;
            }
            
            switch (this.slide) {
                case 0:
                    this.nextArrowState = this.jsonString !== undefined;
                    break;

                default: this.nextArrowState = false;;
            }
        }
        
        setPrevArrowState() {
            this.prevArrowState = this.slide > 0;
        }

        clickNext() {
            if(!this.nextArrowState) return;
            this.slide++;

            this.setPrevArrowState();
            this.setNextArrowState();
        }

        clickPrev() {
            if(!this.prevArrowState) return;
            this.slide--;

            this.setPrevArrowState();
            this.setNextArrowState();
        }

    },

    template: `
        <div class="popup-top">
            <div class="popup-top-back popup-top-arrow" ng-click="$ctrl.clickPrev()" ng-class="{ disabled: !$ctrl.prevArrowState, enabled: $ctrl.prevArrowState }"><i class="fa fa-chevron-left"></i></div>
            <!--<div class="popup-top-open-in-window" ng-click="$ctrl.openInWindow()" ng-class="{ disabled: !$ctrl.canOpenInNewWindow, enabled: $ctrl.canOpenInNewWindow }"><i class="fa fa-window-restore"></i></div>-->
            <div class="popup-top-next popup-top-arrow" ng-click="$ctrl.clickNext()" ng-class="{ disabled: !$ctrl.nextArrowState, enabled: $ctrl.nextArrowState }"><i class="fa fa-chevron-right"></i></div>
            <div style="clear: both"></div>
        </div>
        <div class="popup-body show-slide-{{ $ctrl.slide }}">
            <div class="slide slide0">
                <json-parser></json-parser>
            </div>
            <div class="slide slide1">
                <json-view json-text="{{ $ctrl.jsonString }}"></json-view>
            </div>
            <div style="clear: both;"></div>
        </div>
    `

};

