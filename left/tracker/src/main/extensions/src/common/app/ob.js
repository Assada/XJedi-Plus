define(['app/common', 'jquery.min', 'underscore.min'], function (common) {
    var main = {
        init: function () {
            console.log('Test');
            var html = common.getPageHtml('http://xjedi.com/index.jsp?com=oblist'),
                content = $($.parseHTML(html)).find('table[style="border-collapse:separate;  margin:0 auto;"]');
            main.parse(content);
        },
        parse: function (content) {
            $(content).each(function () {
                var $this = $(this),
                    $date = $this.find('div.lightBack[style="width:100px; margin-right:5px; color:#8bd9ff; text-align:center;"] div[style="margin-top: 6px;"]').text().trim(),
                    $img = $this.find('img').attr('src'),
                    $title = $this.find('div.lightBack[style="width:146px; margin-right: 2px"]').text().trim(),
                    $map = $this.find('div.lightBack[style="width:100px; "]').text().trim(),
                    $players = $this.find('div.lightBack[style="width:42px; "]').text().trim(),
                    $id = +($this.find('div.obListButton').attr('onclick').replace('window.location = \'../index.jsp?com=ob&id=', '').replace("'", '')),
                    informed = kango.storage.getItem('odInformed') || [];
                if (_.indexOf(informed, $id) + 1 === 0) {
                    if (main.inform($date, $img, $title, $map, $players, $id)) {
                        informed.push($id);
                        kango.storage.setItem('odInformed', informed);
                    }
                }
            });
        },
        inform: function (date, img, title, map, players, id) {
            kango.ui.notifications.show(kango.i18n.getMessage('Battle at {date}!', {date: date}), kango.i18n.getMessage("Battle '{title}' on the map {map} ({players})", {date: date, title: title, map: map, players: players}), kango.io.getResourceUrl('/icons/ob.png'), function () {
                kango.browser.tabs.create({url: 'http://xjedi.com/index.jsp?com=ob&id=' + id});
            });
            return true;
        }
    };
    return main;
});
