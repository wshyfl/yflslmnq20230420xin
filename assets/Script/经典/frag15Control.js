
cc.Class({
    extends: cc.Component,

    properties: {
        deng: cc.Node,
        ci: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.num = 0;
        cc.director.on("按下按钮", () => {
            AD.audioMng.playSfx("按钮");
            this.num++
            if (this.num == 3) {
                this.shanguang();
            }
        }, this)
    },
    shanguang() {
        Tools.classBtn = true;
        Tools.touchStartDistance = 0;
        AD.audioMng.playSfx("c4滴");
        this.deng.children[0].active = true;
        this.scheduleOnce(() => {
            AD.audioMng.playSfx("c4滴");
            this.deng.children[1].active = true;
        }, 0.5);
        this.scheduleOnce(() => {
            AD.audioMng.playSfx("c4滴");
            this.deng.children[2].active = true;
            this.scheduleOnce(() => {
                this.bomb();
                var _effct = cc.instantiate(this.ci);
                _effct.parent = this.node.parent;
                AD.audioMng.playSfx("电磁");
                AD.audioMng.playSfx("爆炸");
            }, 0.5)
        }, 1)
    },
    bomb() {
        this.node.opacity = 0;
        var _delayTime = 1;
        this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
        cc.tween(this.node)
            .delay(_delayTime)
            .to(0.3, { x: 400 })
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
