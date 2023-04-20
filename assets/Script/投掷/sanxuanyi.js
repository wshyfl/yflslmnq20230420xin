
cc.Class({
    extends: cc.Component,

    properties: {
        Goods: {
            default: [],
            type: [cc.Prefab]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.num = Tools.random(0, 2);
        this.isahun = false;
        var _effct = cc.instantiate(this.Goods[this.num]);
        _effct.parent = this.node;
        cc.director.on("炸完了", () => {
            this.node.children[0].destroy();
            this.num++;
            if (this.num > 2) {
                this.num = 0;
            }
            var _effct = cc.instantiate(this.Goods[this.num]);
            _effct.parent = this.node;
        }, this);
    },

    // update (dt) {},
});
