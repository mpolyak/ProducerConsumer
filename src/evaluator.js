/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const fs  = require("fs");
const net = require("net");

const PassThrough = require("stream").PassThrough;

const Tokenize = require("./tokenize.js");
const Solve    = require("./solve.js");
const Logger   = require("./logger.js");
const Reporter = require("./reporter.js");

if (process.argv.length !== 3)
{
    console.error("Usage: node src/evaluator.js [Port Number or Unix Socket]");

    process.exit(1);
}

const logger = new Logger(new Reporter());

logger.pipe(process.stdout);

const clients = [];

const server = net.createServer((socket) =>
{
    const length = clients.push(socket);

    console.log(`Generator #${length} connected.`);

    socket.setEncoding("utf8");

    socket.on("end", () =>
    {
        const index = clients.indexOf(socket);

        console.log(`Generator #${index + 1} has disconnected.`);

        clients.splice(index, 1);
    });

    socket.on("error", (error) =>
    {
        const index = clients.indexOf(socket);

        console.error(`Generator #${index + 1}: ${error.toString()}`);

        clients.splice(index, 1);
    });

    const recv = new PassThrough({objectMode: true});
    const send = new PassThrough({objectMode: true});

    recv.on("data", (data) =>
    {
        const index = clients.indexOf(socket);

        logger.write({message: `#${index + 1} Received expression ${data}`});
    });

    send.on("data", (data) =>
    {
        const index = clients.indexOf(socket);

        logger.write({message: `#${index + 1} Sending result ${data}`, increment: true});
    });

    // Receive arithmetic expressions from generator, evaluate and send results back.
    socket.pipe(recv).pipe(new Tokenize()).pipe(new Solve()).pipe(send).pipe(socket);
});

server.on("error", (error) =>
{
    console.error(`Evaluator: ${error.toString()}`);
});

fs.stat(process.argv[2], (error, stats) =>
{
    // Delete existing unix socket.
    if (!error)
        fs.unlinkSync(process.argv[2]);

    server.listen(process.argv[2], () =>
    {
        console.log(`Evaluator is ready on ${process.argv[2]}.`);
    });
});