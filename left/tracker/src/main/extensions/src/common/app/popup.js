KangoAPI.onReady(function () {
    function loadd() {
        var test = _.template($('#template').text()),
            server = kango.storage.getItem('popUpLastServerOpenId') || 0,
            $selectpicker;
        if ($('.monitor').html(test({'servers' : kango.storage.getItem('serversData')}))) {
            $selectpicker = $('.selectpicker');
            $selectpicker.selectpicker();
            $('#server-' + server).show();
            $selectpicker.selectpicker('val', server);
        }
        $('select').on('change', function () {
            var $serverId = +$(this).val();
            if ($('.tab-content').hide()) {
                $('#server-' + $serverId).show();
                kango.storage.setItem('popUpLastServerOpenId', +$serverId);
            }
        });
    }
    loadd();
    setInterval(function () {
        loadd();
    }, 10 * 1000);
});