
cc.Class({
    extends: cc.Component,

    properties: {
        boom: cc.Prefab,
        smokeW: cc.Prefab,
        smokeR: cc.Prefab,
        dianci: cc.Prefab,
        bingBoom: cc.Prefab,
        smoke: cc.Node,
        jiguang: cc.Prefab,
        shouchiBang: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.smoke.active = false;
        this.accspeed = 0.8;
        this.speed = 30;
        this.BoomTime = 3;
        this.isFly = false;
        this.originX = this.node.x;
        this.originY = this.node.y;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.initflyFrag();
        cc.director.on("投掷模式初始化手雷", () => {
            this.initflyFrag();
        }, this)
    },
    initflyFrag() {
        this.node.children.forEach((element, index) => {
            if (index == globalData.nowFrag) {
                element.active = true;
            } else {
                element.active = false;
            }
        });
    },
    onTouchStart(event) {

    },
    onTouchMove(event) {
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
    },
    onTouchEnd(event) {
        this.isFly = true;
        // this.fly();
        AD.audioMng.playSfx("扔");
        this.scheduleOnce(() => {
            this.isBoom();
        }, 1.2)
    },
    isBoom() {
        Tools.fragFlyPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if (!this.isFly) {
            return;
        }
        this.isFly = false;
        this.node.scale = 1;
        if (globalData.nowFrag == 1) {
            AD.audioMng.playSfx("烟雾弹");
            var _effct = cc.instantiate(this.smokeR);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            this.scheduleOnce(() => {
                _effct.destroy();
                this.node.scale = 1;
            }, 8)
        } else if (globalData.nowFrag == 5) {
            AD.audioMng.playSfx("烟雾弹");
            var _effct = cc.instantiate(this.shouchiBang);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            this.scheduleOnce(() => {
                this.node.scale = 1;
                _effct.getComponent(cc.ParticleSystem).stopSystem();
                this.scheduleOnce(() => {
                    _effct.destroy();
                }, 1)
            }, 5)
        } else if (globalData.nowFrag == 6) {
            AD.audioMng.playSfx("烟雾弹");
            var _effct = cc.instantiate(this.smokeW);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            this.scheduleOnce(() => {
                _effct.destroy();
                this.node.scale = 1;
            }, 8)
        } else if (globalData.nowFrag == 2 || globalData.nowFrag == 8) {
            this.smoke.active = true;
            cc.tween(this.smoke)
                .to(0.05, { opacity: 255 })
                .call(() => {
                    AD.audioMng.playSfx("闪光弹");
                })
                .to(4, { opacity: 0 })
                .call(() => {
                    this.node.scale = 1;
                })
                .start();
        } else if (globalData.nowFrag == 4) {
            AD.audioMng.playSfx("电磁");
            var _effct = cc.instantiate(this.dianci);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            _effct.scale = 1.2;
            if (this.node.y > 550) {
            } else if (this.node.y <= 550 && this.node.y >= 350) {
                cc.director.emit("炸上层");
            } else if (this.node.y < 350 && this.node.y >= 50) {
                cc.director.emit("炸上层");
                cc.director.emit("炸下层");
            } else {
                cc.director.emit("炸下层");
            }
            this.scheduleOnce(() => {
                this.chongzhi();
            }, 2.8)
        } else if (globalData.nowFrag == 12) {
            AD.audioMng.playSfx("爆炸");
            AD.audioMng.playSfx("激光");
            var _effct = cc.instantiate(this.jiguang);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            _effct.scale = 1.2;
            if (this.node.y > 550) {
            } else if (this.node.y <= 550 && this.node.y >= 350) {
                cc.director.emit("炸上层");
            } else if (this.node.y < 350 && this.node.y >= 50) {
                cc.director.emit("炸上层");
                cc.director.emit("炸下层");
            } else {
                cc.director.emit("炸下层");
            }
            this.scheduleOnce(() => {
                this.chongzhi();
            }, 2.8)
        } else if (globalData.nowFrag == 11) {
            AD.audioMng.playSfx("投掷冰冻");
            var _effct = cc.instantiate(this.bingBoom);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            if (this.node.y > 550) {
            } else if (this.node.y <= 550 && this.node.y >= 350) {
                cc.director.emit("冻上层");
            } else if (this.node.y < 350 && this.node.y >= 50) {
                cc.director.emit("冻上层");
                cc.director.emit("冻下层");
            } else {
                cc.director.emit("冻下层");
            }
            this.scheduleOnce(() => {
                this.chongzhi();
            }, 2.8)
        } else {
            AD.audioMng.playSfx("爆炸");
            var _effct = cc.instantiate(this.boom);
            _effct.parent = this.node.parent;
            _effct.x = this.node.x;
            _effct.y = this.node.y;
            _effct.scale = 1.2;
            if (this.node.y > 550) {
            } else if (this.node.y <= 550 && this.node.y >= 350) {
                cc.director.emit("炸上层");
            } else if (this.node.y < 350 && this.node.y >= 50) {
                cc.director.emit("炸上层");
                cc.director.emit("炸下层");
            } else {
                cc.director.emit("炸下层");
            }
            this.scheduleOnce(() => {
                this.chongzhi();
            }, 2.8)
        }
        this.node.x = this.originX;
        this.node.y = this.originY;
        this.node.angle = 0;
        this.accspeed = 0.8;
        this.speed = 30;
        this.node.scale = 0;
    },
    chongzhi() {
        if (Tools.ZhaShang && Tools.ZhaXia) {
            cc.director.emit("炸完了");
        }
        Tools.ZhaShang = false;
        Tools.ZhaXia = false;
        this.node.scale = 1;
    },
    fly() {
        cc.tween(this.node)
            .by(1.2, { angle: 800, scale: -0.3 })
            .call(() => {
                this.node.scale = 1;
                this.node.angle = 0;
            })
            .start()
    },
    update(dt) {
        if (this.isFly) {
            Tools.touchStartDistance = 1000;
            if (this.speed < 0 && this.node.y < 150) {
                // this.isBoom();
            } else {
                this.node.y += this.speed;
                this.speed -= this.accspeed;
                this.node.angle += 10;
                if (this.node.scale > 0.3) {
                    this.node.scale -= 0.01;
                }
            }
        }
    },
});
