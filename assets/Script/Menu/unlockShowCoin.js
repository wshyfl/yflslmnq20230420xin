

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    onEnable() {
        this.init();
        this.coinNum = 0;
        cc.director.on("金币变化", (num) => {
            this.coinNum = num;
            this.init();
        }, this);
    },
    init() {
        this.scheduleOnce(() => {
            if (globalData.data.unlockFrag[parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent))] == 1) {
                this.node.scale = 0;
            }
        }, 0.1)
    },
    // update (dt) {},
});
