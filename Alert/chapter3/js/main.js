require.config({
    paths: {
        window: "window",
    }
});

require(["window"], function (w) {
    new w.Window().alert("welcome!", function () {
        alert("you click button");
    });
});