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
        hasCloseBtn:true,
        handler4CloseBtn: function () {
            alert("you click close button");
        },
        handler4AlertBtn: function () {
            alert("you click alert button");
        },
        skinClassName:"window_skin_a",
        text4AlertBtn:"OK",
        dragHandle:".window_header"
    });
});