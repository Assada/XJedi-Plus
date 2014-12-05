/*
var serverInfo = kango.storage.getItem('playersActivity') || [],
    tabs = $('.nav-tabs'),
    content = $('.tab-content');
$(serverInfo).each(function () {

});*/
KangoAPI.onReady(function() {
    var test = _.template($('#template').text());
    if ($('.monitor').html(test({'servers' : kango.storage.getItem('serversData')}))) {
        $('.selectpicker').selectpicker();
    }
    $('select').on('change', function (e) {
        var $optionSelected = $("option:selected", this),
            valueSelected = this.value;
        console.log(valueSelected);
    });
});