
cc.Class({
    extends: cc.Component,

    properties: {
        diaoLuo1: cc.Node,
        hide1: cc.Node,
        diaoLuo2: cc.Node,
        hide2: cc.Node,
        effect: cc.Prefab,
        smoke: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("拉环结束", () => {
            this.handleFly();
        }, this)
    },
    handleFly() {
        this.hide2.active = false;
        this.hide1.active = false;
        if (globalData.nowFrag == 0 || globalData.nowFrag == 1 || globalData.nowFrag == 2 || globalData.nowFrag == 10 || globalData.nowFrag == 14 || globalData.nowFrag == 12) {
            AD.audioMng.playSfx("碎片弹飞");
        }
        cc.tween(this.diaoLuo1)
            .by(0.4, { x: Tools.random(-1000, 1000), y: Tools.random(1000, 1100), angle: Tools.random(400, 600) })
            .start();
        this.scheduleOnce(() => {
            this.bomb();
        }, 2.5)
    },
    bomb() {
        var _actShake = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .by(0.02, { x: 5 })
                    .by(0.02, { x: -5 })
            );
        if (this.node.name == "lei6") {

        } else {
            _actShake.start();
        }
        AD.audioMng.playSfx("烟雾弹");
        this.smoke.active = true;
        this.smoke.getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(() => {
            _actShake.stop();
            this.smoke.getComponent(cc.ParticleSystem).stopSystem();
            cc.tween(this.node)
                .delay(1)
                .to(0.4, { x: 400 })
                .call(() => {
                    cc.director.emit("转动手雷");
                })
                .start();
        }, 3)
    },
    onDestroy() {
        this.unscheduleAllCallbacks();
    }
    // update (dt) {},
});
