
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.isClick = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.director.on("雷6升起来", () => {
            cc.tween(this.node)
                .by(0.9, { y: 160 })
                .call(() => {
                    this.isClick = false;
                })
                .start();
        }, this)
        cc.director.on("拉环结束", () => {
            cc.tween(this.node)
                .by(0.5, { y: 160, opacity: -255 })
                .call(() => {

                })
                .start();
        }, this)
    },
    onTouchStart(event) {
        if (this.isClick) {
            return;
        }
        Tools.classBtn = true;
        AD.audioMng.playSfx("拉拉环");
        cc.director.emit("拉环结束");
        this.isClick = true;
    },
    onTouchMove(event) {

    },
    onTouchEnd(event) {

    },
    // update (dt) {},
});
