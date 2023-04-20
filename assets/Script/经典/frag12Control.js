
cc.Class({
    extends: cc.Component,

    properties: {
        effect: cc.Prefab,
        shuzi: cc.Node,
        shan: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.num = 0;
        this.shan.active = false;
        this.shuzi.children.forEach(element => {
            element.getComponent(cc.Label).string = "";
        });
        this.isBoom = false;
        cc.director.on("按下键位", (name) => {
            if (name == "start" && this.num == 5) {
                if (this.isBoom) {
                    return;
                }
                this.isBoom = true;
                this.dididi();
            } else if (name != "start" && this.num < 5) {
                AD.audioMng.playSfx("c4按键");
                this.shuzi.children[this.num].getComponent(cc.Label).string = name;
                this.num++;
            }
        }, this)
    },
    dididi() {
        Tools.classBtn = true;
        this.scheduleOnce(() => {
            AD.audioMng.playSfx("c4滴");
            this.shan.active = true;
            this.scheduleOnce(() => {
                this.shan.active = false;
                this.scheduleOnce(() => {
                    AD.audioMng.playSfx("c4滴");
                    this.shan.active = true;
                    this.scheduleOnce(() => {
                        this.shan.active = false;
                        this.scheduleOnce(() => {
                            AD.audioMng.playSfx("c4滴");
                            this.shan.active = true;
                            this.scheduleOnce(() => {
                                this.shan.active = false;
                                this.scheduleOnce(() => {
                                    AD.audioMng.playSfx("c4滴");
                                    this.shan.active = true;
                                    this.scheduleOnce(() => {
                                        this.shan.active = false;
                                        this.scheduleOnce(() => {
                                            AD.audioMng.playSfx("c4滴");
                                            this.shan.active = true;
                                            this.scheduleOnce(() => {
                                                this.shan.active = false;
                                                this.scheduleOnce(() => {
                                                    AD.audioMng.playSfx("c4滴");
                                                    this.shan.active = true;
                                                    this.scheduleOnce(() => {
                                                        this.shan.active = false;
                                                        this.scheduleOnce(() => {
                                                            AD.audioMng.playSfx("c4滴");
                                                            this.shan.active = true;
                                                            this.scheduleOnce(() => {
                                                                this.shan.active = false;
                                                                this.scheduleOnce(() => {
                                                                    AD.audioMng.playSfx("c4滴");
                                                                    this.shan.active = true;
                                                                    this.scheduleOnce(() => {
                                                                        this.shan.active = false;
                                                                        this.scheduleOnce(() => {
                                                                            AD.audioMng.playSfx("c4滴");
                                                                            this.shan.active = true;
                                                                            this.scheduleOnce(() => {
                                                                                this.shan.active = false;
                                                                                this.bomb();
                                                                            }, 0.1);
                                                                        }, 0.1)
                                                                    }, 0.1);
                                                                }, 0.1)
                                                            }, 0.1);
                                                        }, 0.1)
                                                    }, 0.1);
                                                }, 0.2)
                                            }, 0.1);
                                        }, 0.2)
                                    }, 0.1);
                                }, 0.2)
                            }, 0.1);
                        }, 0.3)
                    }, 0.1);
                }, 0.3)
            }, 0.1);
        }, 0.3)
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
