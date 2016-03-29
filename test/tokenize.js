/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const expect = require("chai").expect;

const Tokenize = require("../src/tokenize.js");

describe("Tokenize", () =>
{
    describe("Invalid", () =>
    {
        it("should return empty on empty", (done) =>
        {
            const tokenize = new Tokenize();

            tokenize.on("data", (expression) =>
            {
                expect(expression).to.be.empty;

                done();
            });

            tokenize.write("");
        });

        it("should return empty on number", (done) =>
        {
            const tokenize = new Tokenize();

            tokenize.on("data", (expression) =>
            {
                expect(expression).to.be.empty;

                done();
            });

            tokenize.write(42);
        });

        it("should return empty on text", (done) =>
        {
            const tokenize = new Tokenize();

            tokenize.on("data", (expression) =>
            {
                expect(expression).to.be.empty;

                done();
            });

            tokenize.write("a+b=");
        });
    });

    describe("Valid", () =>
    {
        describe("Numbers", () =>
        {
            it("should match positive", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["42"]);

                    done();
                });

                tokenize.write("42=");
            });

            it("should match negative", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-273"]);

                    done();
                });

                tokenize.write("-273=");
            });

            it("should match decimal", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["3.141"]);

                    done();
                });

                tokenize.write("3.141=");
            });
        });

        describe("Positive Numbers", () =>
        {
            it("should match addition", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["1", "+", "2"]);

                    done();
                });

                tokenize.write("1+2=");
            });

            it("should match subtraction", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["1", "+", "-2"]);

                    done();
                });

                tokenize.write("1-2=");
            });

            it("should match multiplication", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["1", "*", "2"]);

                    done();
                });

                tokenize.write("1*2=");
            });

            it("should match division", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["1", "/", "2"]);

                    done();
                });

                tokenize.write("1/2=");
            });
        });

        describe("Negative Numbers", () =>
        {
            it("should match addition", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-1", "+", "-2"]);

                    done();
                });

                tokenize.write("-1+-2=");
            });

            it("should match addition", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-1", "+", "-2"]);

                    done();
                });

                tokenize.write("-1-2=");
            });

            it("should match subtraction", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-1", "-", "-2"]);

                    done();
                });

                tokenize.write("-1--2=");
            });

            it("should match subtraction", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-1", "+", "-2"]);

                    done();
                });

                tokenize.write("-1-2=");
            });

            it("should match multiplication", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-1", "*", "-2"]);

                    done();
                });

                tokenize.write("-1*-2=");
            });

            it("should match division", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal(["-1", "/", "-2"]);

                    done();
                });

                tokenize.write("-1/-2=");
            });
        });

        describe("Complex Expression", () =>
        {
            it("should match", (done) =>
            {
                const tokenize = new Tokenize();

                tokenize.on("data", (expression) =>
                {
                    expect(expression).to.deep.equal([[["-40", "*", "77"], "+", "-40"], "/", "-40", "*", ["4", "+", "7"]]);

                    done();
                });

                tokenize.write("((-40*77)-40)/-40*(4+7)=");
            });
        });
    });
});