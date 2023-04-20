
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Tools.leiPos = cc.v2(0, 0);
        // this.randomx = Tools.random(-300, 300);
        // this.randomy = Tools.random(-100, 100);
        // this.randomTime = Tools.random(2, 8);
        // let jumpTo = cc.jumpTo(this.randomTime / 10, cc.v2(this.randomx, this.randomy), 100, 1);
        // cc.tween(this.node)
        //     .then(jumpTo)
        //     .call(() => {
        //     })
        //     .start();
        // this.randomx = Tools.random(10, 15);
        // this.randomy = Tools.random(3, 15);
        // this.randomTime2 = Tools.random(3, 10);
        // cc.tween(this.node)
        //     .to(this.randomTime / 20, { scale: this.randomx / 10 })
        //     .to(this.randomTime / 20, { scale: this.randomy / 10 })
        //     .to(this.randomTime2 / 10, { scale: this.randomy / 10 })
        //     .to(this.randomTime / 20, { scale: 0 })
        //     .call(() => {
        //         // this.scheduleOnce(() => {
        //         this.node.opacity = 0;
        //         // }, 1)
        //     })
        //     .start();
        // cc.tween(this.node) 
        //     .bezierTo(1, cc.v2(0, 0), cc.v2(0, 200), cc.v2(100, 0))
        //     .start();
    },
    start() {
        this.moveFunc(Tools.fragFlyPos)
    },
    moveFunc(_posBomb) {
        this.die = false;
        this.randomGroundY = Tools.random(-100, 100)
        this.rotateSpeed = Tools.random(-10, 10);
        this.speedAdd = 0.4;
        this.speed = Tools.random(15, 25);
        var _posSelfWorld = this.node.parent.convertToWorldSpaceAR(this.node.position);
        this.angleFly = Tools.getAngle(_posBomb, _posSelfWorld);


        this.vxRateVa = -0.03;
        this.vxRate = 1;
    },
    GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },
    update(dt) {
        if (this.die) return;

        if (this.vxRate > 0) {
            this.vxRate += this.vxRateVa;
            if (this.vxRate < 0)
                this.vxRate = 0;
        }
        else {
            var _posSelfWorld = this.node.parent.convertToWorldSpaceAR(this.node.position);
            if (_posSelfWorld.y <= cc.winSize.height / 2 + this.randomGroundY) {
                this.speed = 0;
                this.die = true;
                cc.tween(this.node)
                    .to(0.3, { opacity: 0 })
                    .call(() => {
                        this.node.destroy();
                    })
                    .start();
                return;
            }
        }
        this.speed -= this.speedAdd;
        this.node.angle += this.rotateSpeed
        this.vx = Math.sin(Tools.angleToRadian(this.angleFly)) * this.speed * this.vxRate;
        this.vy = -Math.cos(Tools.angleToRadian(this.angleFly)) * this.speed;
        this.node.x += this.vx;
        this.node.y += this.vy;

        this.node.y -= 5;

    },
});
