require('angular');
require('./css/index.css');
require('../../assets/css/font-awesome.min.css');

import { mainComponent } from './js/mainComponent';
import { jsonParserComponent } from './js/jsonParserComponent';
import { jsonViewComponent } from './js/jsonViewComponent';


angular.module('jsonplugin', [])
    .component('jsonParser', jsonParserComponent)
    .component('jsonView', jsonViewComponent)
    .component('main', mainComponent);
