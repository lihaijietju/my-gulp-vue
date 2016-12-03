var path = require('path');
exports.Server = {
    "9001": {
        "basePath": path.join(__dirname, "/../../dist"),
        "debug": true
    }
};
exports.TranspondRules = {
    "9001": {
        targetServer: {
            'host': 'rap.kuailv.waimai.sankuai.info',
            'port': '80'
        },
        regExpPath: {
            '/kuailv/[^?]*': {
                'path': '/mockjsdata/24$&'
            }
        },
        'ajaxOnly': false,
        'hackHeaders': false
    }
};