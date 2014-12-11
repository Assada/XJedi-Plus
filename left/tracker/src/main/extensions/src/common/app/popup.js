KangoAPI.onReady(function () {
    function loadd() {
        var test = _.template($('#template').text()),
            server = kango.storage.getItem('popUpLastServerOpenId') || 0;
        if ($('.monitor').html(test({'servers' : kango.storage.getItem('serversData')}))) {
            $('#server-' + server).show();
        }
        $('select').on('change', function () {
            var $serverId = +$(this).val();
            if ($('.tab-content').hide()) {
                $('#server-' + $serverId).show();
                kango.storage.setItem('popUpLastServerOpenId', +$serverId);
            }
        });
        return true;
    }
    loadd();
    setInterval(function () {
        if (loadd()) {
            var $selectpicker = $('.selectpicker');
            $selectpicker.selectpicker();
            $selectpicker.selectpicker('val', server);
        }
    }, 10 * 1000);
});