
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
        cc.director.on("雷6升起来", () => {
            cc.tween(this.node)
                .by(0.9, { y: 160, opacity: -255 })
                .call(() => {
                    
                })
                .start();
        }, this)
    },
    onTouchStart(event) {
        if (this.isClick) {
            return;
        }
        AD.audioMng.playSfx("盖子");
        cc.director.emit("雷6升起来");
        this.isClick = true;
    },
    onTouchMove(event) {

    },
    onTouchEnd(event) {

    },
    // update (dt) {},
});
