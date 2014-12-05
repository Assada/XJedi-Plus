/**
 * Created by Alex on 25.11.2014.
 */
define(['app/common', 'jquery.min'], function (common) {
    var main = {
        init: function () {
            var html = common.getPageHtml('http://xjedi.com/monitor/monitor.jsp'),
                test = $.parseHTML(html);
            kango.storage.setItem('serversData', main.parser(test));
        },
        parser: function (content) {
            var allServers = [],
                activity = kango.storage.getItem('playersActivity') || [],
                time = new Date().getTime();
            $(content).each(function () {
                kango.console.log('parser start');
                var playersInServer = [],
                    $this = $(this),
                    allInServer = +$('span[style="font-size:large; color:#900000;"]').text(),
                    server_names = ($this.find('.header1').text()).split(/\n/);
                if (server_names[1]) {
                    var name = server_names[1].replace(' ', '').trim().replace(/XJedi |UA |- /gi, ''),
                        players = $this.find('.header2[style!="padding-left:4px;"]').text().replace('                   ', '').split(/\n/)[2].trim().split('/'),
                        currPlayers = +players[0].replace('Гравців ', ''),
                        maxPlayers = +players[1],
                        map = $this.find('.header2[style="padding-left:4px;"]').text(),
                        mapSrc = $this.find('img').attr('src'),
                        player_list = $this.find('div[style="width:200px; padding:8px 0px 0px 15px; float:left; left:10px;"]'),
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
                                        if (this.name === activName) {
                                            this.time = time;
                                            this.server = name;
                                        }
                                    });
                                    console.log('upd ' + activName);
                                } else if (activName !== false) {
                                    activity.push({ name: activName, time: time, server: name });
                                    console.log('add1: ' + activName);
                                }
                            }
                            i++;
                        });
                    });
                    allServers.push({
                        name : _.escape(name),
                        currPlayers : currPlayers,
                        maxPlayers : maxPlayers,
                        map: map,
                        mapSrc: mapSrc,
                        players: playersInServer
                    });
                }
                kango.storage.setItem('allInServer', allInServer);
            });
            kango.storage.setItem('playersActivity', activity);
            return allServers;
        }
    };
    return main;
});
