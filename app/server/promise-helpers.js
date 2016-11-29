module.exports = {
    ConditionalPromise : (expression) => {
        return new Promise((resolve, reject) => {
            if (expression) {
                resolve();
            } else {
                reject();
            }
        });
    }
};
