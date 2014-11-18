kango.ui.browserButton.setPopup({url: 'popup.html', width: 710, height: 510});

function MyExtension() {
    var self = this;
    var minutes = 1;
    self._onStart();
    setInterval(self._onStart, 1000 * 60 * minutes); //start getting page each number of minutes.
}
MyExtension.prototype = {
    _onStart: function () {
        monitor();  //get page once at start.
    }
};
function monitor() {
    $.get('http://xjedi.com/monitor/monitor.jsp', function(data){     //monitoring page.
        kango.storage.setItem('monitor', data);  //store monitor html.
    }).fail(function(){
        $('body').html("No connection to server. Try to reload later");
        kango.console.log('something went wrong during connection to server');
    });
}
var extension = new MyExtension();


