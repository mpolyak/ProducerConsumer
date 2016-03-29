/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const expect = require("chai").expect;
const sinon  = require("sinon");

const Expression = require("../src/expression.js");

describe("Expression", () =>
{
    let random;

    before(() =>
    {
        random = sinon.stub(Math, "random").returns(0.25);
    });

    after(() =>
    {
        random.restore();
    });

    it("should generate", (done) =>
    {
        const random = new Expression();

        random.once("data", (expression) =>
        {
            expect(expression).to.equal("25-25=");

            done();
        });
    });
});