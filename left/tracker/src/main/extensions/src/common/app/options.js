console.log('test');
document.addEventListener('DOMContentLoaded', function () {
    var addNick = document.getElementById('addNick');
    addNick.addEventListener('click', function () {
        var $nick = $('#nickName').val(),
            nickList = kango.storage.getItem('nickList') || [];
        if (!(_.indexOf(nickList, $nick) + 1) && $nick.length > 0) {
            nickList.push($nick);
            kango.storage.setItem('nickList', nickList);
        }
        console.log(nickList);
    });
});