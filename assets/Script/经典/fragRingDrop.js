
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.isClick = true;
        if (this.node.parent.name == "lei6") {
            this.isClick = false;
        }
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.director.on("拉环结束", () => {
            if (this.node.parent.name == "lei6") {
                cc.tween(this.node)
                    .by(0.9, { y: 160, opacity: -255 })
                    .call(() => {

                    })
                    .start();
            } else {
                cc.tween(this.node)
                    .by(0.9, { y: -160, opacity: -255 })
                    .call(() => {

                    })
                    .start();
            }
        }, this)
        cc.director.on("拉环下落", () => {
            if (this.node.parent.name == "lei6") {
                cc.tween(this.node)
                    .by(0.3, { y: 80 })
                    .by(0.3, { y: 80 })
                    .call(() => {
                        if (this.node.name != "huan") {
                            cc.tween(this.node)
                                .by(0.9, { y: 160, opacity: -255 })
                                .call(() => {
                                    this.node.destroy();
                                })
                                .start();
                        } else {
                            this.isClick = false;
                        }
                    })
                    .start();
            } else {
                cc.tween(this.node)
                    .by(0.3, { y: -80 })
                    .by(0.3, { y: -80 })
                    .call(() => {
                        if (this.node.name != "huan") {
                            cc.tween(this.node)
                                .by(0.9, { y: -160, opacity: -255 })
                                .call(() => {
                                    this.node.destroy();
                                })
                                .start();
                        } else {
                            this.isClick = false;
                        }
                    })
                    .start();
            }
        }, this)
    },
    onTouchStart(event) {
        if (this.isClick) {
            return;
        }
        // console.log("点击");
        Tools.classBtn = true;
        this.isClick = true; 
        AD.audioMng.playSfx("拉拉环");
        cc.director.emit("拉环结束");
    },
    onTouchMove(event) {

    },
    onTouchEnd(event) {

    },
    // update (dt) {},
});
