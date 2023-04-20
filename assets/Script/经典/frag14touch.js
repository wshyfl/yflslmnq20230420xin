
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.isClick = false;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.director.on("点击了", () => {
            Tools.classBtn = true;
            AD.audioMng.playSfx("按钮");
            cc.tween(this.node)
                .to(0.3, { y: 195 })
                .call(() => {
                    cc.director.emit("拉环结束");
                })
                .start();
        }, this)
    },
    onTouchStart(event) {
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        cc.director.emit("点击了");
    },
    onTouchMove(event) {

    },
    onTouchEnd(event) {

    },
    // update (dt) {},
});
