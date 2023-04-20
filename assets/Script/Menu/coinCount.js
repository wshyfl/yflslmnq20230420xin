
cc.Class({
    extends: cc.Component,

    properties: {
        coinShow: cc.Label,
        getCoinPre: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}, 
    start() {
        this.coinShow.string = globalData.data.coinNum;
        cc.director.on("金币变化", (num) => {
            globalData.setCoinNum(num);
            this.scheduleOnce(() => {
                this.coinShow.string = globalData.data.coinNum;
            }, 1.3)
        }, this);
        cc.director.on("金币立即变化", () => {
            this.coinShow.string = globalData.data.coinNum;
        }, this);
    },
    getCoin() {
        AD.audioMng.playSfx("按钮");
        this.ffff = cc.instantiate(this.getCoinPre);
        this.ffff.parent = cc.find("Canvas");
    }
    // update (dt) {},
});
