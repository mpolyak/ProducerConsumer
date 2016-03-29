/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

const expect = require("chai").expect;
const sinon  = require("sinon");

const Logger = require("../src/logger.js");

describe("Logger", () =>
{
    it("should log and report", () =>
    {
        const reporter = {update: () => {}}, logger = new Logger(reporter), log = sinon.spy(), report = sinon.mock(reporter);

        report.expects("update").thrice();

        logger.on("data", log);

        logger.write({message: "test", increment: true});
        logger.write({message: "test", increment: true});
        logger.write({message: "test", increment: true});

        expect(log.calledThrice).to.be.true;

        report.verify();
    });
});