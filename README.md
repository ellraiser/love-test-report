# love-test-report
Basic github action to dump report output for [love-test](https://github.com/ellraiser/love-test) into a github action

The action will look for speciic header comment in the markdown in the format of:
`<!-- PASSED 32 || FAILED 1 || SKIPPED 0 || TIME 0.004 -->`
This is then used to set the totals for the overview + badge
