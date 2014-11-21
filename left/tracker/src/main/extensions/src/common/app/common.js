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
        }
    };
});