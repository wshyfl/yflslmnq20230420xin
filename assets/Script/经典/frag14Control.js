
cc.Class({
    extends: cc.Component,

    properties: {
        aniNode: cc.Node,
        node1: cc.Node,
        node2: cc.Node,
        bingdong: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("拉环结束", () => {
            this.handleFly();
        }, this)
    },
    handleFly() {
        AD.audioMng.playBingdongMusic();
        this.aniNode.getComponent(cc.Animation).play();
        var animation = this.aniNode.getComponent(cc.Animation);
        this.node1.active = true;
        this.node2.active = true;
        animation.on('finished', this.bomb, this);
    },
    bomb() {
        AD.audioMng.stopBingdongMusic();
        AD.audioMng.playSfx("爆炸");
        this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
        var _effct = cc.instantiate(this.bingdong);
        _effct.parent = this.node.parent;
        AD.audioMng.playSfx("冰冻");
        this.scheduleOnce(() => {
            cc.tween(this.node)
                .to(0.4, { x: 400 })
                .call(() => {
                    cc.director.emit("转动手雷");
                })
                .start();
        }, 3.5)
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
