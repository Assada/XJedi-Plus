requirejs.config({
    baseUrl: './lib',
    paths: {
        app: '../app'
    }
});
kango.console.log('App loaded');
require(
    ['app/od'],
    function (od) {
        (function run() {
            od.init();
            setTimeout(run, 30000);
        }());
    }
);