# love-test-report
basic github action to dump report output for love-test
just dumps the given path md file into a github repo check

will look for speciic header comment in the markdown to set the output results:
`<!-- PASSED 32 || FAILED 1 || SKIPPED 0 || TIME 0.004 -->`
