/**
 * Created by Assada on 20.11.2014.
 */
define(['app/common', 'jquery.min', 'underscore.min'], function (common) {
    var main = {
        init: function () {
            var html = common.getPageHtml('http://xjedi.com/index.jsp?com=odlist&onlyWins=true'),
                content = $($.parseHTML(html)).find('div.odSubBlock1'),
                oldList = kango.storage.getItem('OD_LVLS'),
                track_nicks = kango.storage.getItem('nickList') || [];
            if (main.checkUser(main.createList(content, track_nicks), oldList)) {
                kango.storage.setItem('OD_LVLS', main.createList(content, track_nicks));
            }
        },
        createList: function (content, nicks) {
            var list = [],
                usedNicks = [],
                kostilSuka = [];
            $.each(content, function (index, value) {
                if ($(value).attr('style') === 'width:100%;') {
                    var user = $(value).text(),
                        users = user.split('got'),
                        nick = users[0].trim(),
                        lvl = +(users[1].replace('level ', ''));
                    if (kango.storage.getItem('checkLvl')) {
                        if (!(_.indexOf(kostilSuka, nick) + 1)) {
                            kostilSuka.push(nick);
                            main.informLvl(lvl, nick);
                        }
                    }
                    $.each(nicks, function (index, value) {
                        if (value.indexOf(nick) + 1) {
                            if (!(_.indexOf(usedNicks, nick) + 1)) {
                                usedNicks.push(value);
                                list.push({nick : nick, lvl : lvl});
                            }
                        }
                    });
                }
            });
            return list;
        },
        checkUser: function (newList, oldList) {
            var update = false;
            if (oldList !== null) {
                $.each(newList, function (i, user) {
                    var newNick = user.nick,
                        newLvl = user.lvl;
                    $.each(oldList, function (i, oldUser) {
                        if (oldUser.nick === newNick && +oldUser.lvl !== +newLvl) {
                            kango.console.log("СТАРЫЙ НИК: " + oldUser.nick + "ЛВЛ: " + oldUser.lvl + " | НОВЫЙ:" + newNick + "ЛВЛ:" + newLvl);
                            update = true; //ЛВЛ ИЗМЕНИЛСЯ
                            kango.console.log('LVL изменился');
                            kango.ui.notifications.show('Изменение уровня' + newNick, 'Уровень ' + newNick + ((oldUser.lvl > newLvl) ? ' понизился' : ' повысился') + ' до ' + newLvl, '/icons/userLvlUp.png', function () {
                                kango.console.log('Notification click');
                            });
                        }
                    });
                });
            } else {
                update = true;
            }
            return update;
        },
        getLvl : function (url) {
            console.log('CHECKING');
            var html = common.getPageHtml(url),
                content = $($.parseHTML(html)).find('.profile-property-row>span[style="color: #88eeff; "]'),
                lvl = +$(content[0]).text();
            kango.storage.setItem('profileLvl', lvl);
            //console.log();
        },
        informLvl : function (lvl, nick) {
            var mLvl = kango.storage.getItem('profileLvl'),
                lvlNicks = kango.storage.getItem('lvlNicks') || {},
                lvlNick = lvlNicks[nick] || {};
            console.log(nick + ' GET: ' + lvl + ' LVL!');
            if (+lvl === +mLvl && +lvlNick.lvl !== +lvl && +lvlNick.lvl !== +mLvl) {
                console.log('!!!!!!!!!!!!!!!!!!!' + nick + ' GET: ' + lvl + ' LVL!');
                kango.ui.notifications.show(nick + ' достиг ' + lvl + ' уровня!', 'Уровень ' + nick + ' стал приемлемым для вас!', '/icons/userLvlUp.png', function () {
                    kango.console.log('Notification click');
                });
                lvlNicks[nick] = {lvl : +lvl};
                kango.storage.setItem('lvlNicks', lvlNicks);
            }
        }
    };
    return main;
});
