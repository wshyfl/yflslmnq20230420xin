
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.init();
        cc.director.on("换名字", () => {
            console.log("nao");
            this.init();
        }, this)
    },
    init() {
        this.node.children.forEach((element, index) => {
            if (index == globalData.nowFrag) {
                element.active = true;
            } else {
                element.active = false;
            }
        });
    }
    // update (dt) {},
});
