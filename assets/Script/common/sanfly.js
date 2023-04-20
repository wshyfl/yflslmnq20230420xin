
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // // this.node.angle = this.GetRandomNum(0, 360);
        // this._startPos = this.node.position;
        // this._targetPos = cc.v2(180, 580);
        // if (cc.director.getScene().name == "Menu") {
        //     this._targetPos = cc.v2(-300, 650);
        // }
        // var _x = this._startPos.x + this.GetRandomNum(-150, 150);
        // var _y = this._startPos.y + this.GetRandomNum(-150, 150);
        // var _randomTime1 = this.GetRandomNum(-20, 20) * 0.01;
        // var _randomTime2 = this.GetRandomNum(-20, 20) * 0.01;
        // var _randomAngle = this.GetRandomNum(0, 1);
        // if (_randomAngle == 0)
        //     _randomAngle = -1;
        // cc.tween(this.node)
        //     .to(0.5 + _randomTime1, { position: cc.v2(_x, _y), }, { easing: "sineOut" })
        //     .to(0.8 + _randomTime2, { opacity: 100, scale: 0.5 }, { easing: "sineInOut" })
        //     .call(() => {
        //         this.node.destroy();
        //     })
        //     .start(); 
        if (globalData.nowFrag != 13) {
            this.node.active = false;
        }
        this.randomx = Tools.random(-300, 300);
        this.randomy = Tools.random(-100, 100);
        this.randomTime = Tools.random(2, 8);
        let jumpTo = cc.jumpTo(this.randomTime / 10, cc.v2(this.randomx, this.randomy), 100, 1);
        cc.tween(this.node)
            .then(jumpTo)
            .call(() => { 
            })
            .start();
        this.randomx = Tools.random(10, 15);
        this.randomy = Tools.random(3, 15);
        this.randomTime2 = Tools.random(3, 10);
        cc.tween(this.node)
            .to(this.randomTime / 20, { scale: this.randomx / 10 })
            .to(this.randomTime / 20, { scale: this.randomy / 10 })
            .to(this.randomTime2 / 10, { scale: this.randomy / 10 })
            .to(this.randomTime / 20, { scale: 0 })
            .call(() => {
                // this.scheduleOnce(() => {
                this.node.opacity = 0;
                // }, 1)
            })
            .start();
        // cc.tween(this.node) 
        //     .bezierTo(1, cc.v2(0, 0), cc.v2(0, 200), cc.v2(100, 0))
        //     .start();
    },
    start() {

    },
    GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },
    // update (dt) {},
});
