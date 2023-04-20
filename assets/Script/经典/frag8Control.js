
cc.Class({
    extends: cc.Component,

    properties: {
        smoke: cc.Node,
        aniNode: cc.Node,
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
        this.aniNode.getComponent(cc.Animation).play();
        var animation = this.aniNode.getComponent(cc.Animation);
        animation.on('finished', this.bomb, this);
    },
    bomb() {
        this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
        cc.tween(this.smoke)
            .to(0.05, { opacity: 255 })
            .call(() => {
                AD.audioMng.playSfx("闪光弹");
            })
            .to(4, { opacity: 0 })
            .call(() => {
                cc.tween(this.node)
                    .to(0.4, { x: 400 })
                    .call(() => {
                        cc.director.emit("转动手雷");
                    })
                    .start();
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
