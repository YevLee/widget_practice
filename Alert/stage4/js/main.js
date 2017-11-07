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
        handler: function () {
            alert("you click button");
        },
        width: 300,
        height: 150,
        y: 50
    });
});