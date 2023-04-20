
cc.Class({
    extends: cc.Component,

    properties: {
        bodyNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onEnable() {
        this.bodyNode.scale = 0;
        cc.tween(this.bodyNode)
            .to(0.2, { scaleX: 1, scaleY: 1 })
            .start();
    },
    start() {

    },
    playGame() {
        this.node.active = false;
        AD.audioMng.playSfx("按钮");
        cc.director.emit("扫雷游戏开始");
    }
    // update (dt) {},
});
