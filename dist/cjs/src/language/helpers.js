"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_QUOTES = void 0;
exports.syntaxNode = syntaxNode;
exports.makeParameterType = makeParameterType;
exports.sortLinks = sortLinks;
exports.createLocationLink = createLocationLink;
exports.childrenToString = childrenToString;
exports.filter = filter;
exports.unsupportedOperation = unsupportedOperation;
var cucumber_expressions_1 = require("@cucumber/cucumber-expressions");
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
function syntaxNode(match, name) {
    var nodes = syntaxNodes(match, name);
    if (nodes.length > 1)
        throw new Error("Expected exactly one node, but got ".concat(nodes.map(function (node) { return node.text; })));
    return nodes[0] || null;
}
function syntaxNodes(match, name) {
    return match.captures.filter(function (c) { return c.name === name; }).map(function (capture) { return capture.node; });
}
function makeParameterType(name, regexps) {
    return new cucumber_expressions_1.ParameterType(name, regexps, Object, function (arg) { return arg; }, true, false);
}
function sortLinks(links) {
    return links.sort(function (a, b) {
        var pathComparison = a.locationLink.targetUri.localeCompare(b.locationLink.targetUri);
        if (pathComparison !== 0)
            return pathComparison;
        return a.locationLink.targetRange.start.line - b.locationLink.targetRange.start.line;
    });
}
function createLocationLink(rootNode, selectionNode, targetUri) {
    var targetRange = vscode_languageserver_types_1.Range.create(rootNode.startPosition.row, rootNode.startPosition.column, rootNode.endPosition.row, rootNode.endPosition.column);
    var targetSelectionRange = vscode_languageserver_types_1.Range.create(selectionNode.startPosition.row, selectionNode.startPosition.column, selectionNode.endPosition.row, selectionNode.endPosition.column);
    var locationLink = {
        targetRange: targetRange,
        targetSelectionRange: targetSelectionRange,
        targetUri: targetUri,
    };
    return locationLink;
}
function childrenToString(node, stringNodes) {
    return node.children
        .filter(stringNodes)
        .map(function (node) { return node.text; })
        .join('');
}
var NO_QUOTES = function (child) { return child.type !== '"' && child.type !== "'"; };
exports.NO_QUOTES = NO_QUOTES;
function filter(node, predicate) {
    return flatten(node).filter(predicate);
}
function flatten(node) {
    return node.children.reduce(function (r, o) { return __spreadArray(__spreadArray([], __read(r), false), __read(flatten(o)), false); }, [node]);
}
function unsupportedOperation() {
    throw new Error('Unsupported operation');
}
//# sourceMappingURL=helpers.js.map