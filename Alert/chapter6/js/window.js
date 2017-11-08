define(["jquery"], function ($) {
    function Window() {
        this.cfg = {
            title: "",
            content: "",
            handler: null,
            width: 500,
            height: 300
        };
    }

    //在原型中改写三个弹框
    Window.prototype = {
        constructor: Window,
        alert: function (cfg) {
            var CFG = $.extend(this.cfg, cfg);
            // <div class="window_boundBox"></div>
            var boundingBox = document.createElement("div");
            boundingBox.classList.add("window_boundBox");
            //es 6 string module
            boundingBox.innerHTML = `
                <div class="window_header">${CFG.title}</div>
                <div class="window_body">${CFG.content}</div>
                <div class="window_footer"></div>
                <input type="button" value="确定">`;
            document.body.appendChild(boundingBox);
            // <input type="button" value="确定">
            var btn = document.querySelector(".window_boundBox input");
            btn.addEventListener("click", () => {
                //if handler is not undefined execute it
                CFG.handler && CFG.handler();
                document.body.removeChild(boundingBox);
            });
            //window.innerWidth get viewport width

            //jQuery
            // boundingBox.css({
            //     width:this.cfg.width + "px",
            //     height:this.cfg.height + "px",
            //     left:this.cfg.x || (window.innerWidth - this.cfg.width/2) + "px",
            //     top:this.cfg.y || (window.innerWidth - this.cfg.height/2) + "px"
            // });

            //js
            boundingBox.setAttribute("style",
                "width:" + this.cfg.width + "px;" +
                "height:" + this.cfg.height + "px;" +
                "left:" + (this.cfg.x || ((window.innerWidth - this.cfg.width) / 2)) + "px;" +//居中
                "top:" + (this.cfg.y || ((window.innerHeight - this.cfg.height) / 2)) + "px");
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