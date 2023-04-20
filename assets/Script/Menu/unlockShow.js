
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (globalData.data.unlockFrag[parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent))] == 1) {
            this.node.scale = 0;
        } else {
            if (this.node.name == "yxn_btn_2 copy") {
                if (parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) < 8 && globalData.data.coinNum < 1000) {
                    this.node.scale = 0;
                } else if (parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) < 12 && parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) >= 8 && globalData.data.coinNum < 3000) {
                    this.node.scale = 0;
                } else if (parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) >= 12 && globalData.data.coinNum < 5000) {
                    this.node.scale = 0;
                } else {
                    if (this.node.parent.name == "btnforAd") {
                        this.node.scale = 1;
                    } else {
                        this.node.scale = 0.5;
                    }
                }
            }
        }
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
            } else {
                if (this.node.name == "yxn_btn_2 copy") {
                    if (parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) < 8 && globalData.data.coinNum < 1000) {
                        this.node.scale = 0;
                    } else if (parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) < 12 && parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) >= 8 && globalData.data.coinNum < 3000) {
                        this.node.scale = 0;
                    } else if (parseInt(this.node.parent.parent.parent.children.indexOf(this.node.parent.parent)) >= 12 && globalData.data.coinNum < 5000) {
                        this.node.scale = 0;
                    } else {
                        if (this.node.parent.name == "btnforAd") {
                            this.node.scale = 1;
                        } else {
                            this.node.scale = 0.5;
                        }
                    }
                }
            }
        }, 0.1)
    },
    // update (dt) {},
});
