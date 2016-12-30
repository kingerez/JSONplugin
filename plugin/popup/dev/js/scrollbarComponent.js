require('../css/scrollbar.css');

export const scrollbarComponent = {

    controller: class {

        dragScrollbar(e) {
            let newY = (e.offsetY - this.scrollbarHeight / 2);
            let sbContainerHeight = this.scrollbarContainer.getBoundingClientRect().height;
            if(newY < 0) newY = 0;
            if(newY + this.scrollbarHeight > sbContainerHeight) newY = sbContainerHeight - this.scrollbarHeight;
            this.bar.style.top = newY + 'px';

            this.scrollTop = -newY / this.pct;
            this.scrollable.style.marginTop = this.scrollTop + 'px';
        }

        constructor($scope, $element, $timeout) {

            this.isScrollable = false;
            this.scrollbarHeight = 0;
            this.scrollTop = 0;
            this.pct = 0;
            this.isDragging = false;
            this.scrollbarContainer = $element[0].querySelector('.scrollbar-container');
            this.bar = this.scrollbarContainer.querySelector('.scrollbar-bar');

            $scope.$watch(() => this.scrollable.getBoundingClientRect().height, () => {
                this.scrollableHeight = this.scrollable.getBoundingClientRect().height;
                this.parentHeight = this.parent.getBoundingClientRect().height;
                this.scrollable.style.marginTop = 0;

                this.isScrollable = this.scrollableHeight > this.parentHeight;

                if(this.isScrollable) {
                    $timeout(() => {
                        this.pct = this.parentHeight / this.scrollableHeight;
                        const containerHeight = this.scrollbarContainer.getBoundingClientRect().height;
                        this.scrollbarHeight = containerHeight * this.pct;
                        this.bar.style.top = 0;

                        if(!this.parent.getAttribute('data-mousewheel')) {
                            this.parent.setAttribute('data-mousewheel', true);
                            this.parent.addEventListener('mousewheel', (e) => {
                                if(!this.isScrollable) return;

                                const maxScroll = (this.scrollableHeight - this.parentHeight) * -1;

                                this.scrollTop -= e.deltaY;

                                if(this.scrollTop > 0) this.scrollTop = 0;
                                if(this.scrollTop < maxScroll) this.scrollTop = maxScroll;

                                this.scrollable.style.marginTop = this.scrollTop + 'px';
                                this.bar.style.top = Math.abs(this.scrollTop * this.pct) + 'px';
                            });
                        }

                        if(!this.scrollbarContainer.getAttribute('data-drag')) {
                            this.scrollbarContainer.setAttribute('data-drag', true);
                            this.scrollbarContainer.addEventListener('mousedown', (e) => {
                                this.isDragging = true;
                                this.dragScrollbar(e);
                            });

                            this.scrollbarContainer.addEventListener('mouseleave', () => {
                                this.isDragging = false;
                            });

                            this.scrollbarContainer.addEventListener('mouseup', () => {
                                this.isDragging = false;
                            });

                            this.scrollbarContainer.addEventListener('mousemove', (e) => {
                                this.isDragging && this.dragScrollbar(e);
                            });
                        }
                    }, 1);
                }

            });

        }

    },

    bindings: {
        parent: '=',
        scrollable: '='
    },

    template: `
        <div class="scrollbar-container" ng-show="$ctrl.isScrollable">
            <div class="scrollbar-bar" style="height: {{$ctrl.scrollbarHeight}}px;"></div>
        </div>
    `

};
