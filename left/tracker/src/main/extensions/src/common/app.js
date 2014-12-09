requirejs.config({
    baseUrl: './lib',
    paths: {
        app: '../app'
    }
});
if (kango.storage.getItem('firstInstall') === null) {
    kango.ui.optionsPage.open();
}
require(
    ['app/od', 'app/serversData.js', 'app/ob'],
    function (od, server, ob) {
        (function profile() {
            od.init();
            ob.init();
            if (kango.storage.getItem('checkLvl')) {
                od.getLvl(kango.storage.getItem('profileLink'));
            }
            console.log(kango.storage.getItem('profileLvl') || false);
            setTimeout(profile, 15 * 60 * 1000);
        }());
        (function serverData() {
            var badge = +kango.storage.getItem('allInServer');
            server.init();
            kango.ui.browserButton.setBadgeValue(badge);
            setTimeout(serverData, 10 * 1000);
        }());
    }
);
kango.ui.browserButton.setBadgeBackgroundColor([255, 0, 0, 255]);
kango.ui.browserButton.setTooltipText('XJedi Plus Server Monitoring');
kango.ui.browserButton.setPopup({url: 'popup.html', width: 401, height: 375});