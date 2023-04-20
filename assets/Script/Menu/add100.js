
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.scale = 0;
        cc.director.on("加100金币", () => {
            this.node.scale = 1;
            cc.tween(this.node)
                .to(1.5, { y: 570, opacity: 0 })
                .call(() => {
                    this.node.scale = 0;
                    this.node.y = 520;
                    this.node.opacity = 255;
                })
                .start();
        }, this)
    },

    // update (dt) {},
});
