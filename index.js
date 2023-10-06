const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')

const name = core.getInput('name');
const path = core.getInput('path');
const token = core.getInput('token');
const octokit = github.getOctokit(token);

core.info('token', token)
core.info('octokit', octokit);

// this.

// core.info(`Using test report parser '${this.reporter}'`);

// core.warning(

// read md file at path here
core.info('path', path);
fs.readFile(path, function(err, data) {
  core.info('file data', data)
})

// check test result
const failed = false
const icon = failed ? '❌' : '✅';

var createCheck = octokit.rest.checks.create(Object.assign({ 
  head_sha: process.env.GITHUB_SHA, 
  name: 'Test Results', 
  status: 'completed', 
  output: {
    title: `${name} ${icon}`,
    summary: 'SUMMARY MD DATA'
  } 
}, github.context.repo));

core.setOutput('conclusion', 'it did stuff?');
core.setOutput('passed', 1);
core.setOutput('failed', 1);
core.setOutput('skipped', 1);
core.setOutput('time', 1);
