/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const Server = require("ws").Server;

function Reporter(port)
{
    port = port || 8000;

    this.server = new Server({port: port}, (error) =>
    {
        if (error) {
            console.error(`Reporter: ${error.toString()}`);
        }
        else
            console.log(`Reporter listening on ${port}.`);
    });
}

Reporter.prototype.update = function (opsec)
{
    opsec = opsec.toString();

    this.server.clients.forEach((client) => client.send(opsec));
};

module.exports = Reporter;