
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    },
    onTouchStart(event) {
        cc.director.emit("按下键位", this.node.name);
        this.node.scale = 0.95;
        this.node.children[0].active = true;
    },
    onTouchMove(event) {

    },
    onTouchEnd(event) {
        this.node.scale = 1;
        this.node.children[0].active = false;
    },

    // update (dt) {},
});
