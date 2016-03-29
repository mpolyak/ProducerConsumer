/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const util = require("util");

const Transform = require("stream").Transform;

const seconds = require("./seconds.js");

util.inherits(Logger, Transform);

function Logger(reporter)
{
    Transform.call(this, {objectMode: true});

    this.opsec = 0;
    this.start = 0;
    this.count = 0;

    this.reporter = reporter;
}

Logger.prototype._transform = function (data, encoding, done)
{
    if (data.increment)
    {
        this.count ++;

        const time = seconds(), delta = time - this.start;

        if (delta >= 1)
        {
            this.opsec = Math.round(this.count / delta);
            this.start = time;
            this.count = 0;
        }

        // Update monitoring clients.
        if (this.reporter)
            this.reporter.update(this.opsec);
    }

    this.push(`${this.time()} (${this.opsec} op/sec): ${data.message}\n`);

    done();
};

Logger.prototype.time = function ()
{
    const date = new Date(), hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(), milliseconds = date.getMilliseconds();

    return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds +
        "." + (milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" : "")) + milliseconds;
};

module.exports = Logger;