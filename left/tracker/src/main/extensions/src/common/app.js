requirejs.config({
    baseUrl: './lib',
    paths: {
        app: '../app'
    }
});
kango.console.log('App loaded');
require(
    ['app/od', 'app/serversData.js'],
    function (od, server) {
        (function profile() {
            od.init();
            if (kango.storage.getItem('checkLvl')) {
                od.getLvl(kango.storage.getItem('profileLink'));
            }
            console.log(kango.storage.getItem('profileLvl') || false);
            setTimeout(profile, 60 * 5 * 1000);
        }());
        (function serverData() {
            server.init();
            setTimeout(serverData, 10 * 1000);
        }());
    }
);

kango.ui.browserButton.setPopup({url: 'popup.html', width: 710, height: 510});