// ==UserScript==
// @name Test
// @include http://xjedi.com/forum/*
// @require lib/jquery.min.js
// @require lib/underscore.min.js
// ==/UserScript==

window.addEventListener('load', function () {
    if (document.URL.indexOf('index.php?showuser') + 1) {
        var name = $('.nickname').text().trim(),
            activity = kango.storage.getItem('playersActivity') || [],
            nameData = _.find(activity, function (item) {
                return item.name === name;
            }),
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
        var nickList = kango.storage.getItem('nickList') || [],
            $nickDOM = $('.nickname');
        $nickDOM.each(function () {
            if (!(_.indexOf(nickList, $(this).text()) + 1)) {
                $(this).append('<span style="color:#fff; cursor: pointer" data-nick="' + $(this).text() + '" title="Отслеживать изменения уровня игрока" class="plusss"> + </span>');
            }
        });
        document.querySelector('body').addEventListener('click', function (event) {
            var $target = $(event.target);
            if ($target.hasClass('plusss')) {
                var nick = $target.attr('data-nick');
                if (nickList.push(nick)) {
                    kango.storage.setItem('nickList', nickList);
                    $nickDOM.find('[data-nick="' + nick + '"]').remove();
                }
            }
        });
    }
});
