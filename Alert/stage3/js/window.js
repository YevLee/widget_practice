define(["jquery"], function ($) {
    function Window() {
        this.cfg = {
            content:"",
            handler:null,
            width: 500,
            height: 300
        };
    }

    //在原型中改写三个弹框
    Window.prototype = {
        constructor:Window,
        alert: function (cfg) {
            var CFG = $.extend(this.cfg, cfg);
            // <div class="window_boundBox"></div>
            var boundingBox = document.createElement("div");
            var newContent = document.createTextNode(CFG.content);
            boundingBox.classList.add("window_boundBox");
            boundingBox.appendChild(newContent);
            document.body.appendChild(boundingBox);
            // <input type="button" value="确定">
            var btn = document.createElement("input");
            boundingBox.appendChild(btn);
            btn.setAttribute("type", "button");
            btn.setAttribute("value", "确定");
            btn.addEventListener("click", function () {
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