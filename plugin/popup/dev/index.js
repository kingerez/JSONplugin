require('angular');
require('./css/index.css');
require('../../assets/css/font-awesome.min.css');

import { mainComponent } from './js/mainComponent';
import { jsonParserComponent } from './js/jsonParserComponent';
import { jsonViewComponent } from './js/jsonViewComponent';
import { scrollbarComponent } from './js/scrollbarComponent';

angular.module('jsonplugin', [])
    .component('scrollbar', scrollbarComponent)
    .component('jsonParser', jsonParserComponent)
    .component('jsonView', jsonViewComponent)
    .component('main', mainComponent);
