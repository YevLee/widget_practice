require.config({
    paths: {
        window: "window",
        widget: "widget",
        jquery: "../../lib/jquery",
        jqueryUI: "../../lib/jquery-ui.min"
    }
});

require(["jquery", "window"], function ($, w) {
    function testCallback1() {
        alert("testCallback1");
    }
    function testCallback2() {
        alert("testCallback2");
    }

    document.getElementById("alert").onclick = () => {
        let win = new w.Window();
        win.alert({
            title: "I am alert",
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
        }).on("alert", () => alert("you second click alert button"))
            .on("close", () => alert("you second click close button"));
    };

    document.getElementById("confirm").onclick = () => {
        let win = new w.Window();
        win.confirm({
            title: "I am confirm",
            content: "r u sure del this file",
            width: 300,
            height: 150,
            y: 50,
            text4ConfirmBtn: "ok",
            text4CancelBtn: "cancel",
            dragHandle: ".window_header",
            handler4ConfirmBtn:function () {
                testCallback1();
            },
            handler4CancelBtn:function () {
                testCallback2();
            }
        }).on("confirm",()=> alert("you click yes"))
            .on("cancel",()=> alert("you click cancel"));
    }
});