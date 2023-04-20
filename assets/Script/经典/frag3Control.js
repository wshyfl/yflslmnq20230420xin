
cc.Class({
    extends: cc.Component,

    properties: {
        di1: cc.Node,
        di2: cc.Node,
        huan: cc.Node,
        effect: cc.Prefab,
        smoke5555: cc.Node,
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
        
        this.smoke5555.active = true;
        this.smoke5555.getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(() => {
            this.smoke5555.getComponent(cc.ParticleSystem).stopSystem();
            this.bomb();
        }, 1)
    },
    bomb() {
        var _delayTime = 1;
        this.node.opacity = 0;
        AD.audioMng.playSfx("爆炸");
        var _effct = cc.instantiate(this.effect);
        _effct.parent = this.node.parent;
        this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
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
