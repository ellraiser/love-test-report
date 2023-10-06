// get reqs + action input
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')
const name = core.getInput('name', { required: true });
const path = core.getInput('path', { required: true });
const token = core.getInput('token', { required: true });
const octokit = github.getOctokit(token);

// read md file at path
var reportdata = 'REPORT_NOT_FOUND'
var passed = 0
var failures = 0
var skipped = 0
var time = 0

core.info('Reading report from: ' + path);
fs.readFile('testing/sample.md', 'utf8', function(err, data) {
  if (err) core.info('Report read error: ' + err)

  core.info(data)
  reportdata = data

  if (data.indexOf('<!--') != -1 && data.indexOf('-->') != -1) {
    data.split('-->')[0].split('<!--')[1].split('||').forEach(function(type) {
      var header = type.trim().split(' ');
      if (header[0] == 'PASSED') passed = Number(header[1])
      if (header[0] == 'FAILED') failures = Number(header[1])
      if (header[0] == 'SKIPPED') skipped = Number(header[1])
      if (header[0] == 'TIME') time = Number(header[1])
    })
  }

  var status = failures > 0 ? 'critical' : 'success'
  var badgeinfo = 'tests-' + String(passed) + ' passed,' + String(failures) + ' failed,' + String(skipped) + ' skipped-' + status;
  var msg = failures > 0 ? 'Tests Failed' : 'Tests Passed'
  var badge = '[' + msg + '](https://img.shields.io/badge/tests' + badgeinfo + ')'

  // check test result
  // @TODO pull from md data!
  var failed = false
  var icon = failed ? '❌' : '✅';
  var conclusion = failed ? 'failure' : 'success'
  
  // add repo check
  var createCheck = octokit.rest.checks.create(Object.assign({ 
    head_sha: process.env.GITHUB_SHA, 
    name: 'Test Results', 
    status: 'completed', 
    conclusion: conclusion,
    output: {
      title: `${name} ${icon}`,
      summary: badge + '\n\n' + reportdata
    } 
  }, github.context.repo));
  
  // return results incase needed
  core.setOutput('conclusion', conclusion);
  core.setOutput('passed', passed);
  core.setOutput('failed', failures);
  core.setOutput('skipped', skipped);
  core.setOutput('time', time);

})
