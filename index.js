const core = require('@actions/core');
const github = require('@actions/github');

const name = core.getInput('name');
const path = core.getInput('path');
const token = core.getInput('token');
const octokit = github.getOctokit(token);

// this.

// core.info(`Using test report parser '${this.reporter}'`);

// core.warning(

// read md file at path here
// 

var createCheck = yield octokit.rest.checks.create(Object.assign(
  { head_sha: process.env.GITHUB_SHA, 
   name, 
   status: 'in_progress', 
   output: {
     title: name,
     summary: ''
  } 
}, github.context.repo));
core.info('check', createCheck);

// check test result
const conslusion = 'CONCLUSION';

const icon = isFailed ? '❌' : '✅';
var updateCheck = yield octokit.rest.checks.update(Object.assign({ 
  check_run_id: createCheck.data.id, 
  conclusion, 
  status: 'completed', 
  output: {
    title: `${name} ${icon}`,
    'SUMMARY MD DATA'
  } 
}, github.context.repo));

core.setOutput('conclusion', conslusion);
core.setOutput('passed', 1);
core.setOutput('failed', 1);
core.setOutput('skipped', 1);
core.setOutput('time', 1);
