var exec = require('child_process').exec;
var chalk = require('chalk');

function execute(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

console.log("=".repeat(22));
console.log(chalk.white(" Beginning Tests..."));
console.log("=".repeat(22));
console.log('');

/* Check CSS Syntax */
var sassLint = require('sass-lint');
var sassResults = sassLint.lintFiles(null, {}, '.sass-lint.yml');
try {
    console.log(chalk.white("=== Validating SASS ==="));
    sassLint.failOnError(sassResults, {}, '.sass-lint.yml');

    let warnCnt = sassLint.warningCount(sassResults);
    if (warnCnt > 0) {
        console.log(chalk.yellow(`>> ${warnCnt} warnings.`));
    }
    console.log(chalk.green(">> SASS is valid."));
} catch (err) {
    console.log(chalk.red(err.message));
}

/* Check JS Syntax */
console.log('');
console.log(chalk.white("=== Validating JS ==="));
console.log(chalk.green(">> No JS validation implemented at the moment."));
