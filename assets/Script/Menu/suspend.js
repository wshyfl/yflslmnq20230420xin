
cc.Class({
    extends: cc.Component,

    properties: {
        bodyNode: cc.Node,
        zhezhao: cc.Node,
        icon: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    onEnable() {
        AD.showBanner();
        AD.chaPing();
        this.bodyNode.scale = 0;
        cc.tween(this.bodyNode)
            .to(0.2, { scaleX: 1, scaleY: 1 })
            .start();
    },
    playAgain() {
        AD.audioMng.playSfx("按钮");
        Tools.GuochangClose(this.zhezhao, this.icon, "game");
    },
    returnToMain() {
        AD.audioMng.playSfx("按钮");
        Tools.GuochangClose(this.zhezhao, this.icon, "Menu");
        if (Tools.gameType == 0 || Tools.gameType == 2) {
            Tools.isShowXg = true;
        }
    },
    ContinueGame() {
        cc.director.emit("游戏继续");
        AD.audioMng.playSfx("按钮");
        this.node.active = false;
    },
    // update (dt) {},
});
