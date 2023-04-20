
cc.Class({
    extends: cc.Component,

    properties: {
        zhezhao: cc.Node,
        icon: cc.Node,
        xg: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onEnable() {
        AD.showBanner();
        AD.chaPing();
    },
    start() {
        this.ismove = false;
        this.isclick = false;
    },
    onBtnCallBack(e, t) {
        if (this.isclick) {
            return;
        }
        AD.audioMng.playSfx("按钮");
        globalData.nowFrag = parseInt(e.target.parent.children.indexOf(e.target));
        if (globalData.data.unlockFrag[parseInt(e.target.parent.children.indexOf(e.target))] == 1) {
            this.isclick = true;
            Tools.GuochangClose(this.zhezhao, this.icon, "game");
        } else {
            if (parseInt(e.target.parent.children.indexOf(e.target)) < 8 && globalData.data.coinNum >= 1000) {
                cc.director.emit("金币变化", -1000);
                cc.director.emit("金币立即变化");
                this.done();
            } else if (parseInt(e.target.parent.children.indexOf(e.target)) < 12 && parseInt(e.target.parent.children.indexOf(e.target)) >= 8 && globalData.data.coinNum >= 3000) {
                cc.director.emit("金币变化", -3000);
                cc.director.emit("金币立即变化");
                this.done();
            } else if (parseInt(e.target.parent.children.indexOf(e.target)) >= 12 && globalData.data.coinNum >= 5000) {
                cc.director.emit("金币变化", -5000);
                cc.director.emit("金币立即变化");
                this.done();
            } else {
                console.log("视频解锁");
                AD.showAD(this.done, this);
            }
        }
    },
    done() {
        this.isclick = true;
        cc.director.emit("金币变化", 0);
        cc.director.emit("金币立即变化");
        globalData.setUnlockFrag(globalData.nowFrag);
        Tools.GuochangClose(this.zhezhao, this.icon, "game");
    },
    close() {
        AD.audioMng.playSfx("按钮");
        this.node.active = false;
    },
    left() {
        if (!this.ismove) {
            return;
        }
        this.ismove = false;
        cc.tween(this.xg)
            .to(0.5, { x: 0 })
            .start();
    },
    right() {
        if (this.ismove) {
            return;
        }
        this.ismove = true;
        cc.tween(this.xg)
            .to(0.5, { x: -535 })
            .start();
    },
    // update (dt) {},
});
