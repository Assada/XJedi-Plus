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
                        if ((_.indexOf(kostilSuka, nick) + 1) === 0) {
                            kostilSuka.push(nick);
                            main.informLvl(lvl, nick);
                        }
                    }
                    $.each(nicks, function (index, value) {
                        if (value.indexOf(nick) + 1) {
                            if ((_.indexOf(usedNicks, nick) + 1) === 0) {
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
                            update = true; //ЛВЛ ИЗМЕНИЛСЯ
                            kango.ui.notifications.show(kango.i18n.getMessage('New level {name}', {name: newNick}), kango.i18n.getMessage('{name} level' + ((oldUser.lvl > newLvl) ? 'Down' : 'Up') + ' to {lvl}', {name: newNick, lvl: newLvl}), kango.io.getResourceUrl('/icons/userLvlUp.png'), function () {
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
            var html = common.getPageHtml(url),
                content = $($.parseHTML(html)).find('.profile-property-row>span[style="color: #88eeff; "]'),
                lvl = +$(content[0]).text();
            kango.storage.setItem('profileLvl', lvl);
        },
        informLvl : function (lvl, nick) {
            var mLvl = kango.storage.getItem('profileLvl'),
                lvlNicks = kango.storage.getItem('lvlNicks') || {},
                lvlNick = lvlNicks[nick] || {};
            if (+lvl === +mLvl && +lvlNick.lvl !== +lvl && +lvlNick.lvl !== +mLvl) {
                kango.ui.notifications.show(kango.i18n.getMessage('{name} levelUp to {lvl}', {name: nick, lvl: lvl}), kango.i18n.getMessage('Level {name} became acceptable for you', {name: nick, lvl: lvl}), kango.io.getResourceUrl('/icons/userLvlUp.png'), function () {
                    kango.console.log('Notification click');
                });
                lvlNicks[nick] = {lvl : +lvl};
                kango.storage.setItem('lvlNicks', lvlNicks);
            }
        }
    };
    return main;
});
