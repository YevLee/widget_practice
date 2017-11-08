define(["widget", "jquery", "jqueryUI"], function (widget, $, $UI) {
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
            text4ConfirmBtn: "确定",
            text4CancelBtn: "取消",
            //alert call-back
            handler4AlertBtn: null,
            //close call-back
            handler4CloseBtn: null,
            handler4ConfirmBtn: null,
            handler4CancelBtn: null,
            dragHandle: null
        };
        this.handlers = {};
    }

    Window.prototype = $.extend({}, new widget.Widget(), {//mixin即多继承
        renderUI: function () {
            var footerContent = "";
            switch (this.cfg.winType) {
                case "alert":
                    footerContent = `<input type="button" class="window_alertBtn" value=${this.cfg.text4AlertBtn}>`;
                    break;
                case "confirm":
                    footerContent = `<input type="button" class="window_confirmBtn" value=${this.cfg.text4ConfirmBtn}>
                                    <input type="button" class="window_cancelBtn" value=${this.cfg.text4CancelBtn}>`;
                    break;
            }
            var tempBoundingBox = document.createElement("div");
            tempBoundingBox.classList.add("window_boundBox");
            tempBoundingBox.innerHTML = `
                <div class="window_header">${this.cfg.title}</div>
                <div class="window_body">${this.cfg.content}</div>
                <div class="window_footer">${footerContent}</div>`;

            this.boundingBox = $(tempBoundingBox);

            if (this.cfg.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo("body");
            }

            if (this.cfg.hasCloseBtn) {
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }
            this.boundingBox.appendTo(document.body);
        },

        bindUI: function () {
            var that = this;
            //event delegate
            this.boundingBox.delegate(".window_alertBtn", "click", function () {
                that.fire("alert");
                that.destroy();
            }).delegate(".window_closeBtn", "click", function () {
                that.fire("close");
                that.destroy();
            }).delegate(".window_confirmBtn", "click", function () {
                that.fire("confirm");
                that.destroy();
            }).delegate(".window_cancelBtn", "click", function () {
                that.fire("cancel");
                that.destroy();
            });

            if (this.cfg.handler4CloseBtn) {
                this.on("close", this.cfg.handler4CloseBtn);
            }

            if (this.cfg.handler4AlertBtn) {
                this.on("alert", this.cfg.handler4AlertBtn);
            }

            if (this.cfg.handler4ConfirmBtn) {
                this.on("confirm", this.cfg.handler4ConfirmBtn);
            }

            if (this.cfg.handler4CancelBtn) {
                this.on("cancel", this.cfg.handler4CancelBtn);
            }
        },

        syncUI: function () {
            this.boundingBox.css({
                width: this.cfg.width + "px",
                height: this.cfg.height + "px",
                left: this.cfg.x || ((window.innerWidth - this.cfg.width) / 2) + "px",
                top: this.cfg.y || ((window.innerHeight - this.cfg.height) / 2) + "px"
            });
            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if (this.cfg.isDraggable) {
                if (this.cfg.dragHandle) {
                    this.boundingBox.draggable({handle: this.cfg.dragHandle});
                } else {
                    //draggable is a function in jqueryUI
                    this.boundingBox.draggable();
                }
            }
        },

        destructor: function () {
            this._mask && this._mask.remove();
        },

        //main()
        alert: function (cfg) {
            $.extend(this.cfg, cfg, {winType: "alert"});
            this.render();
            return this;
        },
        confirm: function (cfg) {
            $.extend(this.cfg, cfg, {winType: "confirm"});
            this.render();
            return this;
        },
        prompt: function () {

        }
    });

    // export
    return {
        Window: Window
    }
});