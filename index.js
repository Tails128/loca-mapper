#!/usr/bin/env node

const { getData } = require("./getLanguages/getLanguages.js");
const { getConfig } = require("./utils/getConfig");

getData(getConfig());
