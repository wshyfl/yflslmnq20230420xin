
cc.Class({
    extends: cc.Component,

    properties: {
        zhezhao: cc.Node,
        icon: cc.Node,
        classicType: cc.Node,
        clearanceType: cc.Node,
        throwType: cc.Node,
        frag: {
            default: [],
            type: [cc.Prefab]
        },
        fragParent: cc.Node,
        zantingNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        AD.showBanner();
        if (AD.chanelName == "vivo") {
            if (AD_vivo.chaPingBoo) {
                if (!Tools.isTanShiPin) {
                    AD.shiPin();
                    Tools.isTanShiPin = true;
                }
            }
        }
    },
    onLoad() {
        AD.audioMng.stopMusic();
        this.zantingNode.active = false;
        Tools.GuochangPlay(this.zhezhao, this.icon);
        this.classicType.active = false;
        this.clearanceType.active = false;
        this.throwType.active = false;
        this.classBtn = false;
        //判断模式 
        if (Tools.gameType == 0) {
            this.classicType.active = true;
            this.initClassicGame();
        } else if (Tools.gameType == 1) {
            this.clearanceType.active = true;
        } else if (Tools.gameType == 2) {
            this.throwType.active = true;
        }
    },
    initClassicGame() {
        if (Tools.gameType == 2) {
            cc.director.emit("投掷模式初始化手雷");
        } else {
            var _effct = cc.instantiate(this.frag[globalData.nowFrag]);
            _effct.parent = this.fragParent;
        }
        cc.director.emit("换名字");
    },
    start() {
        this.isChaPing = 0;
        cc.director.on("转动手雷", () => {
            this.isChaPing++;
            if (this.isChaPing == 4) {
                this.isChaPing = 0;
                AD.chaPing();
            }
            cc.director.emit("加100金币");
            cc.director.emit("金币变化", +100);
            Tools.classBtn = false;
            this.fragParent.children.forEach(element => {
                element.destroy();
            });
            var newFrag = cc.instantiate(this.frag[globalData.nowFrag]);
            newFrag.parent = this.fragParent;
            newFrag.x = -800;
            cc.tween(newFrag)
                .to(0.8, { x: 0 })
                .start();
        }, this)
    },
    returnToMain() {
        AD.audioMng.playSfx("按钮");
        if (Tools.gameType == 0 || Tools.gameType == 2) {
            Tools.isShowXg = true;
        }
        Tools.GuochangClose(this.zhezhao, this.icon, "Menu");
    },
    playAgain() {
        AD.audioMng.playSfx("按钮");
        Tools.GuochangClose(this.zhezhao, this.icon, "game");
    },
    onClassicBtnCallBack(e, t) {
        if (Tools.touchStartDistance > 50) {
            return;
        }
        if (Tools.classBtn) {
            return;
        }
        AD.audioMng.playSfx("按钮");
        cc.director.emit("打火机消失");
        globalData.nowFrag = parseInt(e.target.parent.children.indexOf(e.target));
        if (globalData.data.unlockFrag[parseInt(e.target.parent.children.indexOf(e.target))] == 1) {
            this.fragParent.children.forEach(element => {
                element.destroy();
            });
            this.initClassicGame();
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
                AD.showAD(this.done, this);
            }
        }
    },
    done() {
        globalData.setUnlockFrag(globalData.nowFrag);
        cc.director.emit("金币变化", 0);
        cc.director.emit("金币立即变化");
        this.fragParent.children.forEach(element => {
            element.destroy();
        });
        this.initClassicGame();
    },
    zanting() {
        AD.audioMng.playSfx("按钮");
        cc.director.emit("游戏暂停");
        this.zantingNode.active = true;
    }
    // update (dt) {},
});
