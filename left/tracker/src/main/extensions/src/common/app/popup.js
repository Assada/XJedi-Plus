KangoAPI.onReady(function() {
    function loadd() {
        console.log('load2');
        var test = _.template($('#template').text()),
            server = kango.storage.getItem('popUpLastServerOpenId') || 0;
        if ($('.monitor').html(test({'servers' : kango.storage.getItem('serversData')}))) {
            $('.selectpicker').selectpicker();
            $('#server-' + server).show();
            $('.selectpicker').selectpicker('val', server);
        }
        $('select').on('change', function (e) {
            var $optionSelected = $("option:selected", this),
                valueSelected = this.value,
                $serverId = +$(this).val();
            if ($('.tab-content').hide()) {
                $('#server-' + $serverId).show();
                kango.storage.setItem('popUpLastServerOpenId', +$serverId);
            }
            console.log($('#server' + $serverId));
            console.log(this);
        });
    }
    loadd();
    setInterval(function () {
        console.log('load1');
        loadd();
    }, 10 * 1000);
});