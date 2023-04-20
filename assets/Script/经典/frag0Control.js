
cc.Class({
    extends: cc.Component,

    properties: {
        diaoLuo1: cc.Node,
        hide1: cc.Node,
        diaoLuo2: cc.Node,
        hide2: cc.Node,
        effect: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("拉环结束", () => {
            this.handleFly();
        }, this)
    },
    handleFly() {
        // window.shouLeiGame.playSfx("手雷拉环");
        this.hide2.active = false;
        this.hide1.active = false;
        if (this.node.name == "lei9") {
            AD.audioMng.playShanShuoMusic();
        }
        if (globalData.nowFrag == 0 || globalData.nowFrag == 1 || globalData.nowFrag == 2 || globalData.nowFrag == 14 || globalData.nowFrag == 12) {
            AD.audioMng.playSfx("碎片弹飞");
        }
        cc.tween(this.diaoLuo1)
            .by(0.4, { x: Tools.random(-1000, 1000), y: Tools.random(1000, 1100), angle: Tools.random(400, 600) })
            .start();
        this.scheduleOnce(() => {
            if (this.node.name == "lei9") {
                this.scheduleOnce(() => {
                    this.bomb();
                }, 2)
            } else {
                this.bomb();
            }
        }, 2.5)
    },
    bomb() {
        AD.audioMng.stopShanShuoMusic();
        var _delayTime = 1;
        this.node.opacity = 0;
        var _effct = cc.instantiate(this.effect);
        _effct.parent = this.node.parent;
        AD.audioMng.playSfx("爆炸");
        if (this.node.name == "lei9") {
            AD.audioMng.playSfx("激光");
        }
        this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 5, 30);
        cc.tween(this.node)
            .delay(_delayTime)
            .call(() => {
                cc.director.emit("转动手雷");
            })
            .start();
    },
    shakeScreen(_camera, shakeTime, scale, moveH) {
        cc.tween(_camera)
            .to(shakeTime, { y: moveH, scale: scale })
            .to(shakeTime * 2, { y: -moveH, scale: scale })
            .to(shakeTime, { y: 0, scale: 1 })
            .call(() => {
                cc.tween(_camera)
                    .to(shakeTime, { y: moveH, scale: scale })
                    .to(shakeTime * 2, { y: -moveH, scale: scale })
                    .to(shakeTime, { y: 0, scale: 1 })
                    .call(() => {
                        cc.tween(_camera)
                            .to(shakeTime, { y: moveH, scale: scale })
                            .to(shakeTime * 2, { y: -moveH, scale: scale })
                            .to(shakeTime, { y: 0, scale: 1 })
                            .call(() => {

                            })
                            .start();
                    })
                    .start();
            })
            .start();
    },
    onDestroy() {
        this.unscheduleAllCallbacks();
    }
    // update (dt) {},
});
