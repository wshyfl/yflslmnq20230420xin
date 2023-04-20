
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
            cc.director.emit("碰触结束");
            AD.audioMng.playSfx("烟雾弹打开");
        }, this)
    },
    onTouchStart(event) {
        if (this.isClick) {
            return;
        }
        // cc.director.emit("点击了");
        AD.audioMng.playYanWuDanXuanZhuanMusic();
    },
    onTouchMove(event) {
        if (this.isClick) {
            return;
        }
        this.node.x += event.getDeltaX();
        if (this.node.x < -90) {
            this.node.x = - 90;
        }
        if (this.node.x > 90) {
            this.node.x = 90;
        }
    },
    onTouchEnd(event) {
        if (this.isClick) {
            return;
        }
        AD.audioMng.stopYanWuDanXuanZhuanMusic();
        if (this.node.x < 20 && this.node.x > - 20) {
            this.node.x = 0;
            this.isClick = true;
            cc.director.emit("点击了");
        }
    },
    update(dt) {
    },
});
