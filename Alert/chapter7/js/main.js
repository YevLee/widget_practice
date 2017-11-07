require.config({
    paths: {
        jquery: "../../lib/jquery",
        window: "window",
        jqueryUI: "../../lib/jquery-ui.min",
    }
});

require(["jquery", "window"], function ($, w) {
    new w.Window().alert({
        title:"I am title",
        content: "welcome!",
        width: 300,
        height: 150,
        y: 50,
        handler4AlertBtn: function () {
            alert("you click alert button");
        },
        handler4CloseBtn: function () {
            alert("you click close button");
        },
        hasCloseBtn:true
    });
});