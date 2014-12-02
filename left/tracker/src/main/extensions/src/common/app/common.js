/**
 * Created by Assada on 20.11.2014.
 */
define(['jquery.min'], function () {
    return {
        getPageHtml: function (url) {
            var test = [];
            $.ajax({
                url: url,
                global: false,
                cache: false,
                type: "GET",
                dataType: "text",
                async: false,
                success: function (data) {
                    test = data;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(jqXHR, textStatus, errorThrown);
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