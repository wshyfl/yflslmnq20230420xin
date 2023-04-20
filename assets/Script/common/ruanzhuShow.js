
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (AD.chanelName == "oppo" || AD.chanelName == "huaWei") {
            this.node.active = true;
        } else {
            this.node.active = false;
        }
    },

    // update (dt) {},
});
