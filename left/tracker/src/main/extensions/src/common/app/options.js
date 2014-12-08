window.addEventListener('load', function () {
    var $addNick = $('#addNick'),
        $clearNick = $('#clearNick'),
        $btnClearNick = $('#btnClearNickList'),
        $listOfNick = $('#nickList'),
        $profileLink = $('#profileLink'),
        $forumFeatures = $('input#forumFeatures'),
        $checkLvl = $('input#checkLvl'),
        nickList = kango.storage.getItem('nickList') || [],
        randomIndex = Math.floor(Math.random() * nickList.length),
        hash = window.location.hash,
        $inform = $('#trackerInform'),
        $trackStatus = $('#trackerStatus');
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');
    if (kango.storage.getItem('firstInstall') === null) {
        kango.storage.setItem('firstInstall', true);
    }
    if (nickList.length === 0) {
        $btnClearNick.attr('disabled', 'disabled');
        $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
    }
    $.each(nickList, function (id, nick) {
        $listOfNick.append('<span class="label label-default">' + nick + ' <span class="glyphicon glyphicon-trash delete tooltipp" data-toggle="tooltip" data-placement="top" title="Убрать его"></span></span> ');
    });
    $addNick.on('click', function () {
        var $nick = $('#nickName'),
            $nickVal = $nick.val();
        if ((_.indexOf(nickList, $nickVal) + 1) === 0 && $nickVal.length > 0) {
            nickList.push($nickVal);
            kango.storage.setItem('nickList', nickList);
            $nick.val('');
            $btnClearNick.removeAttr('disabled');
            if (nickList.length === 1) {
                $listOfNick.empty();
            }
            $listOfNick.append(' <span class="label label-default">' + $nickVal + ' <span class="glyphicon glyphicon-trash delete tooltipp" data-toggle="tooltip" data-placement="top" title="Убрать его"></span></span> ');
            $('#countOfPlayers').html(nickList.length);
        }
    });
    $clearNick.on('click', function () {
        $btnClearNick.attr('disabled', 'disabled');
        $listOfNick.html('<p class="text-muted">Вы пока не добавили имен для отслеживания</p>');
        kango.storage.removeItem('nickList');
        nickList = [];
    });
    document.querySelector('body').addEventListener('click', function (event) {
        var $target = $(event.target),
            $nick;
        if ($target.hasClass('delete')) {
            $nick = $target.parent().text().replace(' Убрать его', '').trim();
            $target.parent().remove();
            if (nickList.indexOf($nick) > -1) {
                if (nickList.splice(nickList.indexOf($nick), 1)) {
                    kango.storage.setItem('nickList', nickList);
                    $('#countOfPlayers').html(nickList.length);
                }
            }
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
    $inform.on('switchChange.bootstrapSwitch', function (event, state) {
        kango.storage.setItem('trackerInform', state);
        if (state) {
            $trackStatus.html('');
        } else {
            $trackStatus.html(' НЕ ');
        }
    });
    $profileLink.on('keyup', function (event, state) {
        var regexp = /(http|https):\/\/xjedi\.com\/forum\/index\.php\?showuser=\d{1,5}/i;
        if (regexp.test($(this).val())) {
            kango.storage.setItem('profileLink', $(this).val());
        }
    });
    $('.nav-tabs a').on('click', function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });
    if (kango.storage.getItem('checkLvl')) {
        $checkLvl.bootstrapSwitch('state', true);
        $profileLink.removeAttr('disabled');
    } else {
        $checkLvl.bootstrapSwitch('state', false);
        $profileLink.attr('disabled', 'disabled');
    }
    $forumFeatures.bootstrapSwitch('state', kango.storage.getItem('forumFeatures') || false);
    $inform.bootstrapSwitch('state', kango.storage.getItem('trackerInform') || false);
    $('.tooltipp').tooltip();
    $('#lvlNo').html(kango.storage.getItem('checkLvl') ? '' : '<abbr><strong> НЕ </strong></abbr>');
    $trackStatus.html(kango.storage.getItem('trackerInform') ? '' : ' НЕ ');
    $('#yourLvl').html(kango.storage.getItem('profileLvl') || ' вашего ');
    $('#forumFeatures, #checkLvl, #trackerInform').bootstrapSwitch();
    $profileLink.val(kango.storage.getItem('profileLink') || '');
    $('#countOfPlayers').html(nickList.length);
    $('#randName').html(nickList[randomIndex]);
});