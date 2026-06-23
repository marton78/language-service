"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeKey = makeKey;
function makeKey(parameterType) {
    return parameterType.name || parameterType.regexpStrings.join('|');
}
//# sourceMappingURL=helpers.js.map