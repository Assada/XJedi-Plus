// ==UserScript==
// @name Test
// @include http://xjedi.com/forum/*
// @require lib/jquery.min.js
// @require lib/underscore.min.js
// ==/UserScript==
window.addEventListener('load', function () {
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
});
