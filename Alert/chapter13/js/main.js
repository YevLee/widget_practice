require.config({
    paths: {
        jquery: "../../lib/jquery",
        window: "window",
        jqueryUI: "../../lib/jquery-ui.min",
    }
});

require(["jquery", "window"], function ($, w) {
    var win = new w.Window();
    win.alert({
        title: "I am title",
        content: "welcome!",
        width: 300,
        height: 150,
        y: 50,
        hasCloseBtn: true,
        handler4AlertBtn: function () {
            alert("you first click alert button");
        },
        handler4CloseBtn: function () {
            alert("the first click close button");
        },
        skinClassName: "window_skin_a",
        text4AlertBtn: "OK",
        dragHandle: ".window_header"
    });

    win.on("alert", () => alert("you second click alert button"));
    win.on("close", () => alert("you second click close button"));


});