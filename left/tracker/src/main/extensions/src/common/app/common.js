define(['jquery.min'], function () {
    return {
        getPageHtml: function (url) {
            var test = [],
                details = {
                    method: 'GET',
                    url: url,
                    async: false,
                    headers: {'Accept': 'application/json', 'Content-Type': 'text/plain'},
                    contentType: 'json'
                };
            kango.xhr.send(details, function (data) {
                if (data.status === 200 && data.response !== null) {
                    test = JSON.stringify(data.response);
                } else {
                    kango.console.log('something went wrong');
                }
            });
            return test;
        },
        getName: function (name) {
            var namee = name.replace('Pl.Moff', 'PlMoff').replace('Fl.Moff', 'PlMoff').match(/[a-zA-Z\s-]+/g),
                lengthOld = 0;
            if (namee) {
                if (namee[0].trim() !== 'Guest' && namee[0].trim() !== '...') {
                    lengthOld = namee.length;
                    if (lengthOld  >= 4) {
                        namee.pop();
                        namee.shift();
                    }
                    if (lengthOld >= 2) {
                        namee.shift();
                    }
                    if (namee[0] === namee[0].toUpperCase()) {
                        namee.shift();
                    }
                    return namee[0].trim();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    };
});