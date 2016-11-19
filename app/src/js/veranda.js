/* Available through entire application. */

window.veranda = window.veranda || {};

veranda.system = {
    /* [_]onReady is invoked when the DOM is fully loaded
       (prior to images). */

    onReady: (callback) => {
        veranda.system._onReady._callbacks.push(callback);
        veranda.system._onReady.func();
    },

    _onReady: {
        _callbacks: [],
        func: function() {
            if (!veranda.system._onReady._callbacks) return;
            if (['interactive', 'complete'].includes(document.readyState)) {
                while (veranda.system._onReady._callbacks.length > 0) {
                    (veranda.system._onReady._callbacks.shift()).call(veranda);
                }
            }
        }
    }
};

// Alias
veranda.onReady = veranda.system.onReady;

document.addEventListener('readystatechange', veranda.system._onReady.func);