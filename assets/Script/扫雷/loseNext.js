
cc.Class({
    extends: cc.Component,

    properties: {
        bodyNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() { 
        this.node.scale = 0;
        cc.director.on("游戏失败", () => {
            AD.gameOverk();
            AD.audioMng.playSfx("失败");
            this.node.scale = 1;
            this.bodyNode.scale = 0;
            cc.tween(this.bodyNode)
                .to(0.2, { scaleX: 1, scaleY: 1 })
                .start();
        }, this);
    },
    // update (dt) {},
});
