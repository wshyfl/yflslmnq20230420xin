
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
                    .to(0.1, { opacity: 255 })
                    .to(0.1, { opacity: 0 })
            )
            .start();
    },

    // update (dt) {},
});
