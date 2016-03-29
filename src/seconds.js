/*
 * Copyright (c) Michael Polyak. All rights reserved.
 */

"use strict";

module.exports = function ()
{
    const time = process.hrtime();

    return time[0] + (time[1] / 1000000000);
};