// get reqs + action input
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')
const name = core.getInput('name');
const path = core.getInput('path');
const token = core.getInput('token');
const octokit = github.getOctokit(token);


// read md file at path
const reportdata = 'REPORT_NOT_FOUND'
core.info('Reading report from: ', path);
fs.readFile(path, function(err, data) {
  if (err) core.info('Report read error: ', err)
  reportdata = data
})

// check test result
// @TODO pull from md data!
const failed = false
const icon = failed ? '❌' : '✅';
const conclusion = failed ? 'failure' : 'success'
const passed = 1
const failures = 1
const skipped = 1
const time = 1

// add repo check
var createCheck = octokit.rest.checks.create(Object.assign({ 
  head_sha: process.env.GITHUB_SHA, 
  name: 'Test Results', 
  status: 'completed', 
  conclusion: conclusion,
  output: {
    title: `${name} ${icon}`,
    summary: reportdata
  } 
}, github.context.repo));

// return results incase needed
core.setOutput('conclusion', conclusion);
core.setOutput('passed', passed);
core.setOutput('failed', failures);
core.setOutput('skipped', skipped);
core.setOutput('time', time);
