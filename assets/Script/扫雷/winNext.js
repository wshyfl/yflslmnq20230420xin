
cc.Class({
    extends: cc.Component,

    properties: {
        bodyNode: cc.Node,
        coinFly: cc.Prefab,
        zhezhao: cc.Node,
        icon: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.scale = 0;
        this.isclick = false; 
    },

    start() {
        cc.director.on("游戏胜利", () => {
            AD.gameOverk();
            AD.audioMng.playSfx("成功");
            this.node.scale = 1;
            this.bodyNode.scale = 0;
            cc.tween(this.bodyNode)
                .to(0.2, { scaleX: 1, scaleY: 1 })
                .start();
        }, this);
    },
    getNow() {
        if (this.isclick) {
            return;
        }
        AD.audioMng.playSfx("飞金币");
        this.isclick = true;
        cc.director.emit("金币变化", +100);
        this.coinffff = cc.instantiate(this.coinFly);
        this.coinffff.parent = cc.find("Canvas");
        this.scheduleOnce(() => {
            Tools.GuochangClose(this.zhezhao, this.icon, "Menu");
        }, 1);
    },
    ADGet() {
        if (this.isclick) {
            return;
        }
        AD.showAD(this.done, this);
    },
    done() {
        this.isclick = true;
        AD.audioMng.playSfx("飞金币");
        cc.director.emit("金币变化", +200);
        this.coinffff = cc.instantiate(this.coinFly);
        this.coinffff.parent = cc.find("Canvas");
        this.scheduleOnce(() => {
            Tools.GuochangClose(this.zhezhao, this.icon, "Menu");
        }, 1)
    }
    // update (dt) {},
});
