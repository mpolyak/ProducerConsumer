/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const expect = require("chai").expect;

const Solve = require("../src/solve.js");

describe("Solve", () =>
{
    describe("Invalid", () =>
    {
        it("should evaluate as NaN on empty", (done) =>
        {
            const solve = new Solve();

            solve.on("data", (result) =>
            {
                expect(result).to.be.nan;

                done();
            });

            solve.write([]);
        });

        it("should evaluate as NaN on number", (done) =>
        {
            const solve = new Solve();

            solve.on("data", (result) =>
            {
                expect(result).to.be.nan;

                done();
            });

            solve.write([42]);
        });

        it("should evaluate as NaN on text", (done) =>
        {
            const solve = new Solve();

            solve.on("data", (result) =>
            {
                expect(result).to.be.nan;

                done();
            });

            solve.write(["a", "+", "b"]);
        });

        it("should evaluate as NaN on divide by zero", (done) =>
        {
            const solve = new Solve();

            solve.on("data", (result) =>
            {
                expect(result).to.be.nan;

                done();
            });

            solve.write(["1", "/", "0"]);
        });
    });

    describe("Valid", () =>
    {
        describe("Simple Expression", () =>
        {
            it("should evaluate addition", (done) =>
            {
                const solve = new Solve();

                solve.on("data", (result) =>
                {
                    expect(result).to.equal("3");

                    done();
                });

                solve.write(["1", "+", "2"]);
            });

            it("should evaluate subtraction", (done) =>
            {
                const solve = new Solve();

                solve.on("data", (result) =>
                {
                    expect(result).to.equal("-1");

                    done();
                });

                solve.write(["1", "-", "2"]);
            });

            it("should evaluate multiplication", (done) =>
            {
                const solve = new Solve();

                solve.on("data", (result) =>
                {
                    expect(result).to.equal("2");

                    done();
                });

                solve.write(["1", "*", "2"]);
            });

            it("should evaluate division", (done) =>
            {
                const solve = new Solve();

                solve.on("data", (result) =>
                {
                    expect(result).to.equal("0.5");

                    done();
                });

                solve.write(["1", "/", "2"]);
            });
        });

        describe("Complex Expression", () =>
        {
            it("should evaluate", (done) =>
            {
                const solve = new Solve();

                solve.on("data", (result) =>
                {
                    expect(result).to.equal("858");

                    done();
                });

                solve.write([[["-40", "*", "77"], "+", "-40"], "/", "-40", "*", ["4", "+", "7"]]);
            });
        });
    });
});