
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
    },
    onTouchStart(event) {
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        this.node.parent.children[0].active = true;
        this.node.scale = 0;
        cc.director.emit("按下按钮");
    },
    onTouchMove(event) {

    },
    onTouchEnd(event) {

    },

    // update (dt) {},
});
