

cc.Class({
    extends: cc.Component,

    properties: {
        hide1: cc.Node,
        hide2: cc.Node,
        smoke: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("碰触结束", () => {
            Tools.touchStartDistance = 0;
            this.handleFly();
        }, this)
    },
    handleFly() {
        // window.shouLeiGame.playSfx("手雷拉环"); 
        this.hide2.active = true;
        this.hide1.active = false;
        // cc.tween(this.diaoLuo1)
        //     .by(0.4, { x: Tools.random(-1000, 1000), y: Tools.random(1000, 1100), angle: Tools.random(400, 600) })
        //     .start();
        this.scheduleOnce(() => {
            this.bomb();
        }, 1)
    },
    bomb() {
        AD.audioMng.playSfx("烟雾弹");
        var _delayTime = 1;
        this.smoke.active = true;
        // var _effct = cc.instantiate(this.effect);
        // _effct.parent = this.node.parent;
        // this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
        this.smoke.children[0].getComponent(cc.ParticleSystem).resetSystem();
        this.smoke.children[1].getComponent(cc.ParticleSystem).resetSystem();
        this.smoke.children[2].getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(() => {
            this.smoke.children[0].getComponent(cc.ParticleSystem).stopSystem();
            this.smoke.children[1].getComponent(cc.ParticleSystem).stopSystem();
            this.smoke.children[2].getComponent(cc.ParticleSystem).stopSystem();
            cc.tween(this.node)
                .delay(_delayTime)
                .to(0.4, { x: 400 })
                .call(() => {
                    cc.director.emit("转动手雷");
                })
                .start();
        }, 3)
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
