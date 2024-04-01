#!/usr/bin/env node
require('dotenv/config')

const { PunchmoleServer } = require("./app.js");

const PORT = process.env.PORT || 10000
const API_KEYS = (process.env.API_KEYS || "").split(',')
const PUNCHMOLE_ENDPOINT_URL_PATH = process.env.PUNCHMOLE_ENDPOINT_URL_PATH || '/_punchmole'

if(API_KEYS.filter((v) => v !== "").length === 0) {
    const args = process.argv
    args.shift()
    console.error('Error: Missing API_KEYS environment variable, please provide a list of comma-separated API keys allowed to connect to this service')
    console.error(`API_KEYS=random-string ${args.join(" ")}`)
    process.exit(1)
}

PunchmoleServer(PORT, API_KEYS, PUNCHMOLE_ENDPOINT_URL_PATH, console)
