define(function () {
    function Window() {

    }

    //在原型中改写三个弹框
    Window.prototype = {
        alert: function (content,handler) {
            // <div class="window_boundBox"></div>
            var boundingBox = document.createElement("div");
            var newContent = document.createTextNode(content);
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
                handler && handler();
                document.body.removeChild(boundingBox);
            });

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