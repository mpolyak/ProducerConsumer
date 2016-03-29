/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const expect = require("chai").expect;
const sinon  = require("sinon");

const Expression = require("../src/expression.js");
const Tokenize   = require("../src/tokenize.js");
const Solve      = require("../src/solve.js");

describe("Stream", () =>
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

    it("should flow", (done) =>
    {
        const random = new Expression();

        random.pipe(new Tokenize()).pipe(new Solve()).once("data", (result) =>
        {
            expect(result).to.equal("0");

            done();
        });
    });
});