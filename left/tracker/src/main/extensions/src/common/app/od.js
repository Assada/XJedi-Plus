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
                usedNicks = [];
            $.each(content, function (index, value) {
                if ($(value).attr('style') === 'width:100%;') {
                    var user = $(value).text(),
                        users = user.split('got'),
                        nick = users[0].replace(/\s/g, ''),
                        lvl = +(users[1].replace('level ', ''));
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
                        if (oldUser.nick === newNick) {
                            if (+oldUser.lvl !== +newLvl) {
                                kango.console.log("СТАРЫЙ НИК: " + oldUser.nick + "ЛВЛ: " + oldUser.lvl + " | НОВЫЙ:" + newNick + "ЛВЛ:" + newLvl);
                                update = true; //ЛВЛ ИЗМЕНИЛСЯ
                                kango.console.log('LVL изменился');
                                kango.ui.notifications.show('Изменение уровня' + newNick, 'Уровень ' + newNick + ((oldUser.lvl > newLvl) ? ' понизился' : ' повысился') + ' до ' + newLvl, 'http://kangoextensions.com/images/logos/kango.png', function () {
                                    kango.console.log('Notification click');
                                });
                            } else {
                                kango.console.log('LVL !НЕ! изменился');
                            }
                        }
                    });
                });
            } else {
                update = true;
            }
            return update;
        }
    };
    return main;
});
