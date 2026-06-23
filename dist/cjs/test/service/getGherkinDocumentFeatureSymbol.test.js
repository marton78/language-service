"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var getGherkinDocumentFeatureSymbol_js_1 = require("../../src/service/getGherkinDocumentFeatureSymbol.js");
describe('getGherkinDocumentFeatureSymbol', function () {
    it('creates document symbols for keywords', function () {
        var gherkinSource = "\n    Feature: f\n      Background: fb\n      Scenario: s1\n      Scenario: s2\n      Rule: r\n        Background: rb\n        Scenario: rs1\n        Scenario: rs2\n    ";
        var symbol = (0, getGherkinDocumentFeatureSymbol_js_1.getGherkinDocumentFeatureSymbol)(gherkinSource);
        var expected = {
            name: 'Feature: f',
            range: {
                start: {
                    line: 1,
                    character: 13,
                },
                end: {
                    line: 1,
                    character: 14,
                },
            },
            selectionRange: {
                start: {
                    line: 1,
                    character: 13,
                },
                end: {
                    line: 1,
                    character: 14,
                },
            },
            kind: vscode_languageserver_types_1.SymbolKind.File,
            children: [
                {
                    name: 'Background: fb',
                    range: {
                        start: {
                            line: 2,
                            character: 18,
                        },
                        end: {
                            line: 2,
                            character: 20,
                        },
                    },
                    selectionRange: {
                        start: {
                            line: 2,
                            character: 18,
                        },
                        end: {
                            line: 2,
                            character: 20,
                        },
                    },
                    kind: vscode_languageserver_types_1.SymbolKind.Constructor,
                    children: [],
                },
                {
                    name: 'Scenario: s1',
                    range: {
                        start: {
                            line: 3,
                            character: 16,
                        },
                        end: {
                            line: 3,
                            character: 18,
                        },
                    },
                    selectionRange: {
                        start: {
                            line: 3,
                            character: 16,
                        },
                        end: {
                            line: 3,
                            character: 18,
                        },
                    },
                    kind: vscode_languageserver_types_1.SymbolKind.Event,
                    children: [],
                },
                {
                    name: 'Scenario: s2',
                    range: {
                        start: {
                            line: 4,
                            character: 16,
                        },
                        end: {
                            line: 4,
                            character: 18,
                        },
                    },
                    selectionRange: {
                        start: {
                            line: 4,
                            character: 16,
                        },
                        end: {
                            line: 4,
                            character: 18,
                        },
                    },
                    kind: vscode_languageserver_types_1.SymbolKind.Event,
                    children: [],
                },
                {
                    name: 'Rule: r',
                    range: {
                        start: {
                            line: 5,
                            character: 12,
                        },
                        end: {
                            line: 5,
                            character: 13,
                        },
                    },
                    selectionRange: {
                        start: {
                            line: 5,
                            character: 12,
                        },
                        end: {
                            line: 5,
                            character: 13,
                        },
                    },
                    kind: vscode_languageserver_types_1.SymbolKind.Interface,
                    children: [
                        {
                            name: 'Background: rb',
                            range: {
                                start: {
                                    line: 6,
                                    character: 20,
                                },
                                end: {
                                    line: 6,
                                    character: 22,
                                },
                            },
                            selectionRange: {
                                start: {
                                    line: 6,
                                    character: 20,
                                },
                                end: {
                                    line: 6,
                                    character: 22,
                                },
                            },
                            kind: vscode_languageserver_types_1.SymbolKind.Constructor,
                            children: [],
                        },
                        {
                            name: 'Scenario: rs1',
                            range: {
                                start: {
                                    line: 7,
                                    character: 18,
                                },
                                end: {
                                    line: 7,
                                    character: 21,
                                },
                            },
                            selectionRange: {
                                start: {
                                    line: 7,
                                    character: 18,
                                },
                                end: {
                                    line: 7,
                                    character: 21,
                                },
                            },
                            kind: vscode_languageserver_types_1.SymbolKind.Event,
                            children: [],
                        },
                        {
                            name: 'Scenario: rs2',
                            range: {
                                start: {
                                    line: 8,
                                    character: 18,
                                },
                                end: {
                                    line: 8,
                                    character: 21,
                                },
                            },
                            selectionRange: {
                                start: {
                                    line: 8,
                                    character: 18,
                                },
                                end: {
                                    line: 8,
                                    character: 21,
                                },
                            },
                            kind: vscode_languageserver_types_1.SymbolKind.Event,
                            children: [],
                        },
                    ],
                },
            ],
        };
        assert_1.default.deepStrictEqual(symbol, expected);
    });
});
//# sourceMappingURL=getGherkinDocumentFeatureSymbol.test.js.map