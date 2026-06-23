"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var txtgen = __importStar(require("txtgen"));
var index_js_1 = require("../../src/index/index.js");
function verifyIndexContract(name, buildIndex) {
    describe(name, function () {
        describe('basics', function () {
            var s1 = {
                label: 'I have {int} cukes in my belly',
                segments: ['I have ', ['42', '98'], ' cukes in my belly'],
                matched: true,
            };
            var s2 = {
                label: 'I am a teapot',
                segments: ['I am a teapot'],
                matched: true,
            };
            var s3 = {
                label: '{word} can do it',
                segments: [['You', 'They'], 'can do it'],
                matched: true,
            };
            var index;
            beforeEach(function () {
                index = buildIndex([s1, s2, s3]);
            });
            it('matches two words in the beginning of an expression', function () {
                var suggestions = index('have');
                assert_1.default.deepStrictEqual(suggestions, [s1]);
            });
            it('matches a word in an expression', function () {
                var suggestions = index('cukes');
                assert_1.default.deepStrictEqual(suggestions, [s1]);
            });
            it('matches a word in a choice', function () {
                var suggestions = index('98');
                assert_1.default.deepStrictEqual(suggestions, [s1]);
            });
            it('matches another word in a choice', function () {
                var suggestions = index('They');
                assert_1.default.deepStrictEqual(suggestions, [s3]);
            });
            it('matches nothing', function () {
                var suggestions = index('nope');
                assert_1.default.deepStrictEqual(suggestions, []);
            });
        });
        if (!process.env.CI) {
            describe('performance / fuzz', function () {
                it('matches how quickly exactly?', function () {
                    var e_1, _a;
                    for (var i = 0; i < 100; i++) {
                        var length_1 = 100;
                        var allSuggestions = Array(length_1)
                            .fill(0)
                            .map(function () {
                            var sentence = txtgen.sentence();
                            return {
                                label: sentence,
                                segments: [sentence],
                                matched: false,
                            };
                        });
                        var index = buildIndex(allSuggestions);
                        var sentence = allSuggestions[Math.floor(length_1 / 2)].segments[0];
                        var words = sentence.split(' ');
                        // Find a word longer than 5 letters (fall back to the middle word if there are none)
                        var word = words.find(function (word) { return word.length > 5; }) || words[Math.floor(words.length / 2)];
                        var term = word.replace(/[.?!;,']/g, '').toLowerCase();
                        var suggestions = index(term);
                        if (suggestions.length === 0) {
                            console.error("WARNING: ".concat(name, " - no hits for \"").concat(term, "\""));
                        }
                        try {
                            for (var suggestions_1 = (e_1 = void 0, __values(suggestions)), suggestions_1_1 = suggestions_1.next(); !suggestions_1_1.done; suggestions_1_1 = suggestions_1.next()) {
                                var suggestion = suggestions_1_1.value;
                                var s = suggestion.segments[0].toLowerCase();
                                if (!s.includes(term)) {
                                    console.error("WARNING: ".concat(name, " - \"").concat(s, "\" does not include \"").concat(term, "\""));
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (suggestions_1_1 && !suggestions_1_1.done && (_a = suggestions_1.return)) _a.call(suggestions_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                });
            });
        }
    });
}
verifyIndexContract('bruteForceIndex', index_js_1.bruteForceIndex);
verifyIndexContract('fuseIndex', index_js_1.fuseIndex);
verifyIndexContract('jsSearchIndex', index_js_1.jsSearchIndex);
//# sourceMappingURL=Index.test.js.map