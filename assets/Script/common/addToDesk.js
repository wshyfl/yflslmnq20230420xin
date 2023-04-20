
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (AD.chanelName == "vivo") {
            if (AD_vivo.chaPingBoo) {
                this.node.active = true;
            } else {
                this.node.active = false;
            }
        }
        if (AD.chanelName == "oppo") {
            if (AD_oppo.chaPingBoo) {
                this.node.active = true;
            } else {
                this.node.active = false;
            }
        }
        if (AD.chanelName == "QQ") {
            if (AD.wuDianRate == 0) { 
                this.node.active = false;
            }
        }
        if (AD.chanelName == "android") {
            this.node.active = false;
        }
    },
    addToDesk() {
        AD.audioMng.playSfx("按钮");
        AD.addToDesk();
    }
    // update (dt) {},
});
