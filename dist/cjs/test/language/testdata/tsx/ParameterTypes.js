"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.defineParameterType)({
    name: 'planet',
    regexp: [/jupiter/, /mars/, /tellus/],
    transformer: function (name) { return name; },
});
(0, cucumber_1.defineParameterType)({
    name: 'uuid',
    regexp: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/,
    transformer: function (uuid) { return uuid; },
});
(0, cucumber_1.defineParameterType)({
    name: 'date',
    regexp: /\d{4}-\d{2}-\d{2}/,
    transformer: function (name) { return new Date(name); },
});
//# sourceMappingURL=ParameterTypes.js.map