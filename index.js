const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
const path = require('path');

async function run() {
  try {
    const inputs = {};
    for (const key in process.env) {
      if (process.env.hasOwnProperty(key)) {
        if (key.startsWith('INPUT_')) {
          inputs[key.substr(6)] = process.env[key];
        }
      }
    }
    core.exportVariable('NIXBUILD_TOKEN', core.getInput('nixbuild_token'));
    core.exportVariable('NIXBUILD_HOST', core.getInput('nixbuild_host'));
    core.exportVariable('NIXBUILD_PORT', core.getInput('nixbuild_port'));
    core.exportVariable('NIXBUILD_KNOWN_HOST', core.getInput('nixbuild_known_host'));
    await exec.exec(path.resolve(__dirname, 'nixbuild-action.sh'), [JSON.stringify(inputs)]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
