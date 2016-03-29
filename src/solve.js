/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const util = require("util");

const Transform = require("stream").Transform;

const Arithmetic =
{
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};

util.inherits(Solve, Transform);

function Solve()
{
    Transform.call(this, {objectMode: true});
}

Solve.prototype._transform = function (expression, encoding, done)
{
    // Evaluate expression (without arithmetic operator precedence) recursively and return a numeric result or NaN if the expression is invalid.
    this.push(this.evaluate(expression).toString());

    done();
};

Solve.prototype.evaluate = function (expression)
{
    if (typeof expression !== "object")
        return Number(expression);

    let result = NaN;

    while (expression.length)
    {
        if (isNaN(result))
        {
            result = this.evaluate(expression.shift());

            if (isNaN(result))
                return NaN;
        }
        else
        {
            const operator = expression.shift();

            if (operator in Arithmetic && expression.length)
            {
                result = Arithmetic[operator](result, this.evaluate(expression.shift()));

                if (isNaN(result))
                    return NaN;
            }
            else
                return NaN;
        }
    }

    return result;
};

module.exports = Solve;