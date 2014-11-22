console.log('test');
window.addEventListener('load', function () {
    var addNick = document.getElementById('addNick'),
        clearNick = document.getElementById('clearNick'),
        $btnClearNick = $('#btnClearNickList'),
        $listOfNick = $('#nickList'),
        nickList = kango.storage.getItem('nickList') || [];
    if (nickList.length === 0) {
        $btnClearNick.attr('disabled', 'disabled');
        $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
    } else {
        $('.delete').tooltip();
    }
    $.each(nickList, function (id, nick) {
        $listOfNick.append('<span class="label label-default">' + nick + ' <span class="glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Убрать его"></span></span> ');
    });
    addNick.addEventListener('click', function () {
        var $nick = $('#nickName'),
            $nickVal = $nick.val();
        if (!(_.indexOf(nickList, $nickVal) + 1) && $nickVal.length > 0) {
            nickList.push($nickVal);
            kango.storage.setItem('nickList', nickList);
            $nick.val('');
            $btnClearNick.removeAttr('disabled');
            if (nickList.length === 1) {
                $listOfNick.empty();
            }
            $listOfNick.append(' <span class="label label-default">' + $nickVal + ' <span class="glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Убрать его></span></span> ');
        }
        console.log(nickList);
    });
    clearNick.addEventListener('click', function () {
        $btnClearNick.attr('disabled', 'disabled');
        $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
        kango.storage.removeItem('nickList');
        nickList = [];
    });
    document.querySelector('body').addEventListener('click', function (event) {
        var $target = $(event.target);
        if ($target.hasClass('delete')) {
            var $nick = $target.parent().text().trim();
            $target.parent().remove();
            if (nickList.indexOf($nick) > -1) {
                if (nickList.splice(nickList.indexOf($nick), 1)) {
                    kango.storage.setItem('nickList', nickList);
                }
            }
            if (nickList.length === 0) {
                $btnClearNick.attr('disabled', 'disabled');
                $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
            }
        }
    });
});