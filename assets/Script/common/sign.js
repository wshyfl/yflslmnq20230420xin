

cc.Class({
    extends: cc.Component,

    properties: {
        day: cc.Node,
        coinfly: cc.Prefab,
        bodyNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.showAD = true;
        Tools.isshowSign = 2;
        this.bodyNode.scale = 0;
        cc.tween(this.bodyNode)
            .to(0.2, { scaleX: 1, scaleY: 1 })
            .start();
        //获取今日日期
        var today = Tools.getNowFormatDate();
        var Saveday = new Date(globalData.data.signDay);
        this.disparity = (today - Saveday) / (1000 * 60 * 60 * 24);
        //将签过到的标识打勾
        this.xuqianDay = globalData.getSignContinuous();
        this.checkall();
    },
    onEnable() {
        this.checkall();
        if (this.showAD) {
            AD.showBanner();
            AD.chaPing();
            this.showAD = false;
        } else {
            this.showAD = true;
        }
        this.bodyNode.scale = 0;
        cc.tween(this.bodyNode)
            .to(0.2, { scaleX: 1, scaleY: 1 })
            .start();
    },
    checkall() {
        for (var i = 0; i < 7; i++) {
            //将之前天数的签到打勾
            if (this.xuqianDay > i) {
                this.day.children[i].getChildByName("duigou").active = true; //已签到
                this.day.children[i].getChildByName("img_xuanZHongKuang").active = false;//金边
                this.day.children[i].getComponent(cc.Button).interactable = false;
            }
            if (this.disparity != 0) {
                if (this.xuqianDay == i) {
                    this.day.children[i].getChildByName("img_xuanZHongKuang").active = true;//金边
                    this.day.children[i].getComponent(cc.Button).interactable = true;
                } else {
                    this.day.children[i].getComponent(cc.Button).interactable = false;
                }
            } else {
                this.day.children[i].getComponent(cc.Button).interactable = false;
            }
        }
    },
    start() {

    },
    onBtnCallBack(e, t) {
       
        switch (t) {
            case "返回":
                AD.audioMng.playSfx("按钮");
                this.node.active = false;
                break;
            case "领取":
                AD.audioMng.playSfx("飞金币");
                cc.director.emit("签到完成");
                //不再弹签到
                Tools.isshowSign = 2;
                globalData.setSignDay();
                globalData.setSignContinuous();
                //获取今日日期
                var today = Tools.getNowFormatDate();
                var Saveday = new Date(globalData.data.signDay);
                this.disparity = (today - Saveday) / (1000 * 60 * 60 * 24);
                //将签过到的标识打勾
                this.xuqianDay = globalData.getSignContinuous();
                this.checkall();

                switch (this.xuqianDay) {
                    case 1:
                        cc.director.emit("金币变化", +300);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                    case 2:
                        cc.director.emit("金币变化", +300);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                    case 3:
                        cc.director.emit("金币变化", +300);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                    case 4:
                        cc.director.emit("金币变化", +300);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                    case 5:
                        cc.director.emit("金币变化", +300);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                    case 6:
                        cc.director.emit("金币变化", +300);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                    case 7:
                        cc.director.emit("金币变化", +500);
                        this.coinffff = cc.instantiate(this.coinfly);
                        this.coinffff.parent = cc.find("Canvas");
                        break;
                }
                this.scheduleOnce(() => {
                    this.node.active = false;
                }, 1.3)
                break;
        }
    },
    update(dt) {

    },
});