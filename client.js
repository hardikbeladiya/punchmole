#!/usr/bin/env node
require('dotenv/config')

const { PunchmoleClient } = require("./app.js");

const PUNCHMOLE_ENDPOINT_URL = 'wss://jira.matlabinfotech.com/_punchmole'
const PUNCHMOLE_API_KEY = 'vmtsuogjkf'
const DOMAIN = 'jira.matlabinfotech.com'
const TARGET_URL =  'http://192.168.29.165:8080'

if(!DOMAIN) {
    console.error('please specify a domain by using environment variable DOMAIN')
    process.exit(1)
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function startClient() {
    return new Promise((resolve) => {
        const events = PunchmoleClient(
            PUNCHMOLE_API_KEY,
            DOMAIN,
            TARGET_URL,
            PUNCHMOLE_ENDPOINT_URL
        )
        events.on('close', () => {
            resolve()
        })
        events.on('error', () => {
            resolve()
        })
    })
}

setTimeout(async () => {
    while(true) {
        await startClient()
        console.log(new Date(), 'restarting client in 500ms')
        await wait(500)
    }


}, 500)

