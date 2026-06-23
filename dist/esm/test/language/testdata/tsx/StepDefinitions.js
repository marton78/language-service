var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Given } from '@cucumber/cucumber';
import assert from 'assert';
import React from 'react';
const dummyTsx = React.createElement("span", null, "Hello");
Given('a {uuid}', function (uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        assert(uuid);
    });
});
Given('a {date}', function (date) {
    return __awaiter(this, void 0, void 0, function* () {
        assert(date);
    });
});
Given('a {planet}', function (planet) {
    return __awaiter(this, void 0, void 0, function* () {
        assert(planet);
    });
});
Given(/^a regexp$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        assert(true);
    });
});
Given('an {undefined-parameter}', function (date) {
    return __awaiter(this, void 0, void 0, function* () {
        assert(date);
    });
});
Given("the bee's knees", function () {
    return __awaiter(this, void 0, void 0, function* () {
        assert(true);
    });
});
//# sourceMappingURL=StepDefinitions.js.map