define(["jquery", "jqueryUI"], function ($, $UI) {
    function Window() {
        this.cfg = {
            title: "",
            content: "",
            width: 500,
            height: 300,
            hasMask: true,
            hasCloseBtn: false,
            isDraggable: true,
            skinClassName: "",
            text4AlertBtn: "确定",
            //alert call-back
            handler4AlertBtn: null,
            //close call-back
            handler4CloseBtn: null,
            dragHandle: null
        };
        this.handlers = {};
    }

    //在原型中改写三个弹框
    Window.prototype = {
        // observer pattern
        on: function (type, handler) {
            if (!this.handlers[type]) {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        fire: function (type, data) {
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (let i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
        },
        alert: function (cfg) {
            var that = this;
            var CFG = $.extend(this.cfg, cfg);
            var boundingBox = document.createElement("div");
            boundingBox.classList.add("window_boundBox");
            boundingBox.innerHTML = `
                <div class="window_header">${CFG.title}</div>
                <div class="window_body">${CFG.content}</div>
                <div class="window_footer"></div>
                <input type="button" class="window_alertBtn" value=${CFG.text4AlertBtn}>`;
            document.body.appendChild(boundingBox);
            var mask = null;
            if (CFG.hasMask) {
                mask = document.createElement("div");
                mask.classList.add("window_mask");
                document.body.insertBefore(mask, document.body.firstChild);
            }

            if (CFG.isDraggable) {
                if (CFG.dragHandle) {
                    $(boundingBox).draggable({handle: CFG.dragHandle});
                } else {
                    //draggable is a function in jqueryUI
                    $(boundingBox).draggable();
                }
            }

            var btn = document.querySelector(".window_boundBox input");
            btn.addEventListener("click", () => {
                document.body.removeChild(boundingBox);
                mask && document.body.removeChild(mask);
                that.fire("alert");
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
                    document.body.removeChild(boundingBox);
                    mask && document.body.removeChild(mask);
                    that.fire("close");
                });
            }

            if (CFG.skinClassName) {
                //特度值
                boundingBox.classList.add(CFG.skinClassName);
            }

            if (CFG.handler4CloseBtn) {
                this.on("close", CFG.handler4CloseBtn);
            }

            if (CFG.handler4AlertBtn) {
                this.on("alert", CFG.handler4AlertBtn);
            }


        },
        constructor: Window,
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