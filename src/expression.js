/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const util = require("util");

const Readable = require("stream").Readable;

const operators = ["+", "-", "*", "/"];

util.inherits(Expression, Readable);

function Expression(delay)
{
    Readable.call(this, {objectMode: true});

    this.delay = (delay || 0) * 1000;
}

Expression.prototype._read = function ()
{
    // Generate a random expression at the requested delay.
    setTimeout(() => this.push(this.generate() + "="), this.delay);
};

Expression.prototype.operator = function ()
{
    return operators[Math.floor(Math.random() * operators.length)];
};

Expression.prototype.number = function ()
{
    return Math.floor(Math.random() * 100) * (Math.random() < 0.25 ? -1 : 1);
};

Expression.prototype.generate = function (depth)
{
    const chance = 0.25 / Math.sqrt(depth || 1), random = () => Math.random() < chance ? this.generate((depth || 1) + 1) : this.number();

    let expression = random() + this.operator() + random();

    while (Math.random() < chance)
        expression += this.operator() + random();

    if (depth)
        expression = `(${expression})`;

    return expression;
};

module.exports = Expression;