const helpers = {

    getType: function (obj) {
        if(obj.constructor == Array)
            return 'array';

        return typeof obj;
    },

    getTypeName: function (type) {
        switch (type) {
            case 'object': return 'Object';
            case 'array': return 'Array';
            default: return '';
        }
    }

};