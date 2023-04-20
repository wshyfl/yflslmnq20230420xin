
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.3, { scale: 1.1 })
                    .to(0.3, { scale: 1 })
            )
            .start();
    },

    // update (dt) {},
});
