
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
    // onLoad () {},

    start() {
        this.diaoLuo1.on("touchstart", () => {
            this.click();
        }, this)
        this.yuanPos1 = this.diaoLuo1.position;
        this.yuanPos2 = this.diaoLuo2.position;

        this.scheduleOnce(()=>{
            this.reset(this.indexOfLei);
        },0.1)
    },
    resetIndex(_index) {
        this.indexOfLei = _index;
    },
    reset(_index) {
        this.node.opacity = 255;
        this.node.x = -720;
        this.diaoLuo1.angle = this.diaoLuo2.angle = 0;
        this.diaoLuo1.opacity = 255;
        this.diaoLuo1.position = this.yuanPos1;
        this.diaoLuo2.position = this.yuanPos2;
        this.hide1.active = this.hide2.active = true;
        cc.tween(this.node)
            .to(0.2, { x: 0 }, { easing: "sineInOut" })
            .start();
        if (this.smoke) {
            this.smoke.active = false;
        }
    },

    onDisable() {
        this.unscheduleAllCallbacks();
    },

    click() {
        cc.tween(this.diaoLuo1)
            .by(0.4, { x: 250 })
            .by(0.5, { y: -300, opacity: -255 }, { easing: "sineOut" })
            .start();
        this.scheduleOnce(() => { this.act2() }, 0.2)
    },
    act2() {
        // window.shouLeiGame.playSfx("手雷拉环");
        this.hide2.active = false;
        this.hide1.active = false;
        cc.tween(this.diaoLuo2)
            .by(0.4, { x: this.random(-1000, 1000), y: this.random(1000, 1100), angle: this.random(400, 600) })
            .start();
        this.scheduleOnce(() => {
            this.bomb();
        }, 2)
    },
    //爆炸效果
    bomb() {
        var _delayTime = 4;

        // window.shouLeiGame.playSfx("爆炸",this.indexOfLei);
        switch (this.indexOfLei) {
            case 0:    //手雷
                if (this.effect) {
                    _delayTime = 1;
                    this.node.opacity = 0;
                    var _effct = cc.instantiate(this.effect);
                    _effct.parent = this.node.parent;
                    this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
                    cc.tween(cc.find("blink", this.node.parent.parent))
                        .to(0.05, { opacity: 180 })
                        .to(1, { opacity: 0 })
                        .start();
                }
                break;
            case 1:  //烟雾弹
                if (this.smoke) {
                    var _actShake = cc.tween(this.node)
                        .repeatForever(
                            cc.tween()
                                .by(0.02, { x: 5 })
                                .by(0.02, { x: -5 })
                        );
                    _actShake.start();
                    this.smoke.active = true;
                    this.smoke.getComponent(cc.ParticleSystem).resetSystem();
                    this.scheduleOnce(() => {
                        _actShake.stop();
                        this.smoke.getComponent(cc.ParticleSystem).stopSystem();
                    }, 3)
                }
                break;
            case 2://闪光弹-
                _delayTime = 3;
                this.shakeScreen(cc.find("Canvas/Main Camera"), 0.02, 1.04, 15);
                cc.tween(cc.find("blink", this.node.parent.parent))
                    .to(0.05, { opacity: 255 })
                    .to(4, { opacity: 0 })
                    .start();
                break;
        }




        //重置手雷
        cc.tween(this.node)
            .delay(_delayTime)
            .to(0.5, { x: 720 }, { easing: "sineInOut" })
            .call(() => {
                this.reset(this.indexOfLei);
            })
            .start();
    },
    // update (dt) {},


    //获得随机整数 上下限都包括
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },

    shakeScreen(_camera, shakeTime, scale, moveH) {
        cc.tween(_camera)
            .to(shakeTime, { y: moveH, scale: scale })
            .to(shakeTime, { y: 0, scale: 1 })
            .start();
    },
});
