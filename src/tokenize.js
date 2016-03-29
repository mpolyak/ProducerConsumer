/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const util = require("util");

const Transform = require("stream").Transform;

const subtractions = /([\d)])-(\d)/g, tokens = /(-?\d+(\.\d+)?)|([+\-*/()]?)/g;

util.inherits(Tokenize, Transform);

function Tokenize()
{
    Transform.call(this, {objectMode: true});
}

Tokenize.prototype._transform = function (expression, encoding, done)
{
    // Return a list of valid tokens or an empty list on failure.
    try
    {
        let length = 0;

        while (expression.length !== length)
        {
            length = expression.length;

            // Compensate for lack of lookbehind regex capability in JavaScript with a replace operation to repeatedly expand subtractions.
            expression = expression.replace(subtractions, "$1+-$2");
        }

        // Split expression string into a list of numbers and arithmetic operators and recursively group nested expressions.
        this.push(this.group(expression.match(tokens).filter((token) => token.length > 0)));
    }
    catch (e) {
        this.push([]);
    }

    done();
};

Tokenize.prototype.group = function (tokens)
{
    const expression = [];

    while (tokens.length)
    {
        const token = tokens.shift();

        if (token !== "(")
        {
            if (token !== ")") {
                expression.push(token);
            }
            else
                break;
        }
        else
            expression.push(this.group(tokens));
    }

    return expression;
};

module.exports = Tokenize;