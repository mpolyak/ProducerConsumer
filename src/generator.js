/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const net = require("net");

const PassThrough = require("stream").PassThrough;

const Expression = require("./expression.js");
const Logger     = require("./logger.js");

if (process.argv.length !== 4)
{
    console.error("Usage: node src/generator.js [Port Number or Unix Socket] [Delay in Seconds]");

    process.exit(1);
}

const logger = new Logger();

logger.pipe(process.stdout);

const client = net.connect(process.argv[2], () =>
{
    console.log("Connected to evaluator.");

    const send = new PassThrough({objectMode: true});
    const recv = new PassThrough({objectMode: true});

    send.on("data", (data) =>
    {
        logger.write({message: `Sending expression ${data}`});
    });

    recv.on("data", (data) =>
    {
        logger.write({message: `Received result ${data}`, increment: true});
    });

    // Generate random arithmetic expressions at the specified delay, send them to the evaluator for calculation and log received results.
    const random = new Expression(Number(process.argv[3]));

    random.pipe(send).pipe(client).pipe(recv);
});

client.on("end", () =>
{
    console.log("Disconnected from evaluator.");

    process.exit(0);
});

client.on("error", (error) =>
{
    console.error(`Generator: ${error.toString()}`);
});