
cc.Class({
    extends: cc.Component,

    properties: {
        xg: cc.Node,
        sign: cc.Node,
        zhezhao: cc.Node,
        icon: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onEnable() {
        AD.showBanner();
        AD.chaPing();
    },
    start() {
        // 0 经典
        AD.audioMng.playMusic();
        Tools.GuochangPlay(this.zhezhao, this.icon); 
        this.xg.active = false;
        this.sign.active = false;
        if (Tools.isShowXg) {
            this.xg.active = true;
            Tools.isShowXg = false;
        }
    },
    btnCallBack(event, type) {
        AD.audioMng.playSfx("按钮");
        switch (type) {
            case "经典":
                Tools.gameType = 0;
                this.xg.active = true;
                break;
            case "扫雷":
                Tools.gameType = 1;
                Tools.GuochangClose(this.zhezhao, this.icon, "game");
                break;
            case "丢雷":
                Tools.gameType = 2;
                this.xg.active = true;
                break;
            case "签到":
                this.sign.active = true;
                break;
            case "获取金币":
                this.sign.active = true;
                break;
        }
    },
    // update (dt) {},
});
