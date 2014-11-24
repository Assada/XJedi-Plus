console.log('test');
window.addEventListener('load', function () {
    var addNick = document.getElementById('addNick'),
        clearNick = document.getElementById('clearNick'),
        $btnClearNick = $('#btnClearNickList'),
        $listOfNick = $('#nickList'),
        $profileLink = $('#profileLink'),
        $forumFeatures = $('input#forumFeatures'),
        $checkLvl = $('input#checkLvl'),
        nickList = kango.storage.getItem('nickList') || [];
    if (nickList.length === 0) {
        $btnClearNick.attr('disabled', 'disabled');
        $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
    }
    $.each(nickList, function (id, nick) {
        $listOfNick.append('<span class="label label-default">' + nick + ' <span class="glyphicon glyphicon-trash delete tooltipp" data-toggle="tooltip" data-placement="top" title="Убрать его"></span></span> ');
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
            $listOfNick.append(' <span class="label label-default">' + $nickVal + ' <span class="glyphicon glyphicon-trash delete tooltipp" data-toggle="tooltip" data-placement="top" title="Убрать его"></span></span> ');
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
            var $nick = $target.parent().text().replace(' Убрать его', '').trim();
            $target.parent().remove();
            console.log(':' + $nick);
            if (nickList.indexOf($nick) > -1) {
                if (nickList.splice(nickList.indexOf($nick), 1)) {
                    kango.storage.setItem('nickList', nickList);
                }
            }
            console.log(nickList);
            if (nickList.length === 0) {
                $btnClearNick.attr('disabled', 'disabled');
                $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
            }
        }
    });
    $forumFeatures.on('switchChange.bootstrapSwitch', function (event, state) {
        kango.storage.setItem('forumFeatures', state);
    });
    $checkLvl.on('switchChange.bootstrapSwitch', function (event, state) {
        kango.storage.setItem('checkLvl', state);
        if (state) {
            $profileLink.removeAttr('disabled');
        } else {
            $profileLink.attr('disabled', 'disabled');
        }
        $('#lvlNo').html(kango.storage.getItem('checkLvl') ? '' : '<abbr><strong> НЕ </strong></abbr>');
    });
    $profileLink.on('keyup', function (event, state) {
        var regexp = /(http|https):\/\/xjedi\.com\/forum\/index\.php\?showuser=\d{1,5}/i;
        if (regexp.test($(this).val())) {
            kango.storage.setItem('profileLink', $(this).val());
        }
    });
    if (kango.storage.getItem('checkLvl')) {
        $checkLvl.bootstrapSwitch('state', true);
        $profileLink.removeAttr('disabled');
    } else {
        $checkLvl.bootstrapSwitch('state', false);
        $profileLink.attr('disabled', 'disabled');
    }
    $forumFeatures.bootstrapSwitch('state', kango.storage.getItem('forumFeatures') || false);
    $('.tooltipp').tooltip();
    $('#lvlNo').html(kango.storage.getItem('checkLvl') ? '' : '<abbr><strong> НЕ </strong></abbr>');
    $('#yourLvl').html(kango.storage.getItem('profileLvl') || ' 1 ');
    $('#forumFeatures, #checkLvl').bootstrapSwitch();
    $profileLink.val(kango.storage.getItem('profileLink') || '');
});