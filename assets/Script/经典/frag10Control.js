
cc.Class({
    extends: cc.Component,

    properties: {
        zhadan: cc.Node,
        effect: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start() {
        cc.director.emit("出现打火机");
        this.ani = this.zhadan.getComponent(sp.Skeleton);
        cc.director.on("点燃", () => {
            Tools.classBtn = true;
            if (this.node.name == "lei11") {
                AD.audioMng.playSfx("引线");
            } else {
                AD.audioMng.playSfx("燃烧瓶引线");
            }
            this.ani.setAnimation(0, "act", false);
        }, this)
        this.ani.setCompleteListener((a, evt) => {
            switch (a.animation.name) {
                case "act":
                    this.bomb();
                    break;
            }
        });
    },
    bomb() {
        var _delayTime = 1;
        this.node.opacity = 0;
        if (this.node.name == "lei11") {
            AD.audioMng.playSfx("爆炸");
        } else {
            AD.audioMng.playSfx("燃烧瓶碎");
            AD.audioMng.playSfx("燃烧瓶烧");
        }
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
