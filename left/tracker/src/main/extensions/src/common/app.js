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
            if (kango.storage.getItem('checkLvl')) {
                od.getLvl(kango.storage.getItem('profileLink'));
            }
            console.log(kango.storage.getItem('profileLvl') || false);
            setTimeout(run, 30000);
        }());
    }
);