define(["jquery"], function ($) {
    function Window() {
        this.cfg = {
            title: "",
            content: "",
            width: 500,
            height: 300,
            hasCloseBtn: false,
            skinClassName: "",
            text4AlertBtn:"确定",
            //alert call-back
            handler4AlertBtn: null,
            //close call-back
            handler4CloseBtn: null
        };
    }

    //在原型中改写三个弹框
    Window.prototype = {
        constructor: Window,
        alert: function (cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var boundingBox = document.createElement("div");
            boundingBox.classList.add("window_boundBox");
            boundingBox.innerHTML = `
                <div class="window_header">${CFG.title}</div>
                <div class="window_body">${CFG.content}</div>
                <div class="window_footer"></div>
                <input type="button" class="window_alertBtn" value=${CFG.text4AlertBtn}>`;
            document.body.appendChild(boundingBox);

            var btn = document.querySelector(".window_boundBox input");
            btn.addEventListener("click", (event) => {
                //if handler is not undefined execute it
                CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                document.body.removeChild(boundingBox);
                //stop bubble
                event.stopPropagation();
            });
            boundingBox.setAttribute("style",
                "width:" + this.cfg.width + "px;" +
                "height:" + this.cfg.height + "px;" +
                "left:" + (this.cfg.x || ((window.innerWidth - this.cfg.width) / 2)) + "px;" +//居中
                "top:" + (this.cfg.y || ((window.innerHeight - this.cfg.height) / 2)) + "px");

            if (CFG.hasCloseBtn) {
                // <span class="window_closeBtn">X</span>
                let closeBtn = document.createElement("span");
                closeBtn.classList.add("window_closeBtn");
                closeBtn.appendChild(document.createTextNode("X"));
                boundingBox.appendChild(closeBtn);
                closeBtn.addEventListener("click", () => {
                    CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    document.body.removeChild(boundingBox)
                });
            }

            if (CFG.skinClassName) {
                //特度值
                boundingBox.classList.add(CFG.skinClassName);
            }
        },
        confirm: function () {

        },
        prompt: function () {

        }
    };

    // export
    return {
        Window: Window
    }
});