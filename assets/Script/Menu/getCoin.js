

cc.Class({
    extends: cc.Component,

    properties: {
        bodyNode: cc.Node,
        coinfly: cc.Prefab,
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
    btnCallBack(event, type) {
        AD.audioMng.playSfx("按钮");
        switch (type) {
            case "关闭":
                this.node.active = false;
                break;
            case "领取":
                AD.showAD(this.done, this);
                break;
        }
    },
    done() {
        AD.audioMng.playSfx("飞金币");
        cc.director.emit("金币变化", +500);
        this.coinffff = cc.instantiate(this.coinfly);
        this.coinffff.parent = cc.find("Canvas");
        this.node.active = false;
    }
    // update (dt) {},
});
