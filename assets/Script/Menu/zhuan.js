
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.tween(this.node)
            .by(1, { angle: 60 })
            .repeatForever()
            .start();
    },

    // update (dt) {},
});
