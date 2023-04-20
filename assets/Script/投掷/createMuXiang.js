
cc.Class({
    extends: cc.Component,

    properties: {
        muxiang: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    onEnable() {
        var _effct = cc.instantiate(this.muxiang);
        _effct.parent = this.node;
    }
    // update (dt) {},
});
