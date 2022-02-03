# Overview

This repository demonstrates an insecure usage pattern of the ADO extension, similar to [this GitHub research paper](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/).

In summary, users should not build/process untrusted code in the same job as a task that requires increased permissions. It can lead to escalation of privilege.

In [this pipeline build](https://dev.azure.com/karansin/test/_build/results?buildId=64&view=logs&j=12f1170f-54f2-53f3-20dd-22fc7dff55f9&t=7384d774-f7ca-599c-ee57-ab2c05be9247) the website "build" step runs code from a maliciously crafted NPM package called `replace-node`. The NPM package overwrites the ADO node handler on the machine and exfiltrates the service connection token passed to our accessibility task. In a "real-life" scenario `replace-node` could introduce malicious code in a new update that gets picked up in a new PR.

Our extension is meant to run on new PRs and requires increased access to make PR comments. If the PRs come from untrusted sources (automated sources, forks, or unexpected update brought in "normal" development).

The GitHub paper suggests two ways of processing untrusted code:
- remove the behavior that requires increased access; the untrusted code can still run, but can't do much damage
- separate the process into two different jobs; generate an artifact from the first job that processes untrusted code, and make PR comments in the second job based on the artifact