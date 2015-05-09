// ==UserScript==
// @name Test
// @include http://xjedi.com/forum/*
// @require lib/jquery.min.js
// @require lib/jquery.highlight.js
// @require lib/underscore.min.js
// ==/UserScript==

$(document).ready(function () {
    var nickList = kango.storage.getItem('nickList') || [],
        $nickDOM = $('.nickname'),
        name,
        activity,
        nameData,
        time,
        image_src = kango.io.getResourceUrl('/icons/track.png');
    document.styleSheets[1].addRule('.plusss', "opacity: 0.7; display: inline; width: 11px; height: 11px; cursor: pointer; padding-left: 11px; position: relative; top: 4px; left: 4px; background-image: url('" + image_src + "'); background-position: -13px 0; background-repeat: no-repeat;");
    document.styleSheets[1].addRule('.minusss', "opacity: 0.7; display: inline; width: 11px; height: 11px; cursor: pointer; padding-left: 11px; position: relative; top: 4px; left: 4px; background-image: url('" + image_src + "'); background-position: 0 0; background-repeat: no-repeat;");
    document.styleSheets[1].addRule('.highlight', "background-color: #FFFF88 !important;");
    if (document.URL.indexOf('index.php?showuser') + 1) {
        name = $nickDOM.text().trim();
        activity = kango.storage.getItem('playersActivity') || [];
        nameData = _.find(activity, function (item) {
            return item.name === name;
        });
        time = (nameData !== undefined) ? new Date(nameData.time) : 'undefined';
        if (nameData !== undefined) {
            $($('table.borderwrap>tbody')[0]).append('<tr><td class="row2" valign="top"><b>Був помічений на серверах JA</b></td><td class="row1"><b>' +
                time.getDate() + '.' + (time.getMonth() + 1) + ' ' + time.getHours() + ':' + time.getMinutes() +
                '</b> на сервері <b>' +
                nameData.server +
                '</b></td></tr>');
        }
    }
    if (kango.storage.getItem('forumFeatures')) {
        $nickDOM.each(function () {
            if (nickList.indexOf($(this).text()) + 1 === 0) {
                $(this).append('<div data-nick="' + $(this).text() + '" title="' + kango.i18n.getMessage('Track changes in the level of the player') + '" class="plusss"></div>');
            } else {
                $(this).append('<div data-nick="' + $(this).text() + '" title="' + kango.i18n.getMessage('Do not track changes in the level of the player') + '" class="minusss"></div>');
            }
        });
        document.querySelector('body').addEventListener('click', function (event) {
            var $target = $(event.target),
                nick;
            if ($target.hasClass('plusss')) {
                nick = $target.attr('data-nick');
                if (nickList.push(nick)) {
                    kango.storage.setItem('nickList', nickList);
                    $nickDOM.find('[data-nick="' + nick + '"]').attr('class', 'minusss');
                    $("body").highlight(nick);
                }
            } else {
                if ($target.hasClass('minusss')) {
                    nick = $target.attr('data-nick');
                    if (nickList.splice(nickList.indexOf(nick), 1)) {
                        kango.storage.setItem('nickList', nickList);
                        $nickDOM.find('[data-nick="' + nick + '"]').attr('class', 'plusss');
                        $("body").unhighlight(nick);
                    }
                }
            }
        });
    }
    if (kango.storage.getItem('goToForum')) {
        $('#header_link').attr('href', '/forum/');
        $('#submenu a[href="/forum"]').html('XJedi').attr('href', '/');
    }
    if (kango.storage.getItem('highlightNicks')) {
        $("body").highlight(nickList);
    }
});
