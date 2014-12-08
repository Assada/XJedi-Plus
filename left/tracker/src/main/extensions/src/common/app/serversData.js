define(['app/common', 'jquery.min'], function (common) {
    var main = {
        init: function () {
            var html = common.getPageHtml('http://xjedi.com/monitor/monitor.jsp'),
                test = $.parseHTML(html),
                activity = kango.storage.getItem('playersActivity') || [],
                nickList = kango.storage.getItem('nickList') || [],
                time = new Date().getTime();
            kango.storage.setItem('serversData', main.parser(test, activity, nickList, time));
        },
        inform: function (user, server) {
            var time = new Date(),
                inform = kango.storage.getItem('trackerInform') || false;
            if (inform) {
                kango.ui.notifications.show(user + ' замечен на сервере!', user + ' в ' + time.getHours() + ':' + time.getMinutes() + ' был замечен на сервере ' + server, '/icons/userOnServer.png', function () {
                    kango.console.log('Notification click');
                });
            }
        },
        parser: function (content, activity, nickList, time) {
            var allServers = [],
                allInServer = false;
            $(content).each(function () {
                var playersInServer = [],
                    $this = $(this),
                    server_names = ($this.find('.header1').text()).split(/\n/),
                    name = false,
                    players = false,
                    currPlayers = false,
                    maxPlayers = false,
                    map = false,
                    mapSrc = false,
                    player_list = false,
                    scores = false;
                allInServer = ($(this).find('span[style="font-size:large; color:#900000;"]').text() !== '') ? +$(this).find('span[style="font-size:large; color:#900000;"]').text() : allInServer;
                if (server_names[1]) {
                    name = _.escape(server_names[1].replace(' ', '').trim().replace(/XJedi |UA |- /gi, ''));
                    players = $this.find('.header2[style!="padding-left:4px;"]').text().replace('                   ', '').split(/\n/)[2].trim().split('/');
                    currPlayers = +players[0].replace('Гравців ', '');
                    maxPlayers = +players[1];
                    map = $this.find('.header2[style="padding-left:4px;"]').text();
                    mapSrc = $this.find('img').attr('src');
                    player_list = $this.find('div[style="width:200px; padding:8px 0px 0px 15px; float:left; left:10px;"]');
                    scores = ($this.find('div[style="width:30px; height:14px;border-bottom:1px solid #C0C6CC; overflow: hidden; float:left; "]').text()).split(/\n/);
                    $(player_list).each(function () {
                        var $thisP = $(this),
                            users = $thisP.find('div[style*="width:140px; height:14px; border-bottom:1px solid #C0C6CC;"]'),
                            i = 1,
                            activName = '';
                        $(users).each(function () {
                            var user = $(this).html().replace('                    ', '').trim();
                            if (i !== 1) {
                                i++;
                            }
                            if (user.replace('                ', '').length !== 0) {
                                playersInServer.push({ user: user, score: +scores[i]});
                                activName = common.getName($(user).text().trim());
                                if (activName !== false && _.find(activity, function (item) {
                                        return item.name === activName;
                                    }) && $(user).text().trim() !== '...') {
                                    $(activity).each(function () {
                                        var $thisA = this;
                                        if (this.name === activName) {
                                            if (_.indexOf(nickList, activName) + 1) {
                                                if ($thisA.server === name) {
                                                    if ((+time - +$thisA.time) > 30 * 60 * 1000) {
                                                        main.inform(activName, name);
                                                    }
                                                } else {
                                                    main.inform(activName, name);
                                                }
                                            }
                                            $thisA.time = time;
                                            $thisA.server = name;
                                        }
                                    });
                                } else if (activName !== false) {
                                    activity.push({ name: activName, time: time, server: name });
                                }
                            }
                            i++;
                        });
                    });
                    allServers.push({
                        name : name,
                        currPlayers : currPlayers,
                        maxPlayers : maxPlayers,
                        map: map,
                        mapSrc: mapSrc,
                        players: playersInServer
                    });
                }
            });
            kango.storage.setItem('allInServer', allInServer);
            kango.storage.setItem('playersActivity', activity);
            return allServers;
        }
    };
    return main;
});