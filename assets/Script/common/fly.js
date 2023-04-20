
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.angle = this.GetRandomNum(0, 360);
        this._startPos = this.node.position;
        this._targetPos = cc.v2(-200, 570); 
        var _x = this._startPos.x + this.GetRandomNum(-100, 100);
        var _y = this._startPos.y + this.GetRandomNum(-100, 100);
        var _randomTime1 = this.GetRandomNum(-20, 20) * 0.01;
        var _randomTime2 = this.GetRandomNum(-20, 20) * 0.01;
        var _randomAngle = this.GetRandomNum(0, 1);
        if (_randomAngle == 0)
            _randomAngle = -1;
        cc.tween(this.node)
            .to(0.5 + _randomTime1, { position: cc.v2(_x, _y), angle: this.node.angle + 180 * 2 * _randomAngle }, { easing: "sineOut" })
            .to(0.8 + _randomTime2, { position: this._targetPos, opacity: 100, scale: 0.5, angle: this.node.angle + 180 * 4 * _randomAngle }, { easing: "sineInOut" })
            .call(() => {
                this.node.destroy();
            })
            .start();
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
