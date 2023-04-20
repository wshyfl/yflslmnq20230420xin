
cc.Class({
    extends: cc.Component,

    properties: {
        numShow: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.gameover = false;
        this.isStop = false;
        this.node.children[1].scale = 0;
        this.node.children[2].scale = 0;
        this.timeNum = 60;
        this.isStopSaoLei = false;
        if (Tools.gameType == 0) {
            this.node.active = false;
            return;
        }
        if (Tools.gameType == 1) {
            this.isStopSaoLei = true;
        }
        if (Tools.gameType == 2) {
            this.timeNum = 30;
            this.numShow.string = this.timeNum;
        }
        cc.director.on("游戏胜利", () => {
            this.gameover = true;
        }, this);
        cc.director.on("扫雷游戏开始", () => {
            this.isStopSaoLei = false;
        }, this);
        cc.director.on("游戏暂停", () => {
            this.isStop = true;
        }, this);
        cc.director.on("游戏继续", () => {
            this.isStop = false;
        }, this);
        this.schedule(() => {
            if (this.gameover) {
                return;
            }
            if (this.isStop) {
                return;
            }
            if (this.isStopSaoLei) {
                return;
            }
            this.timeNum--;
            if (this.timeNum <= 0) {
                this.timeNum = 0;
                this.gameover = true;
                if (Tools.gameType == 2) {
                    cc.director.emit("游戏胜利");
                } else {
                    cc.director.emit("游戏失败");
                }
            }
            this.numShow.string = this.timeNum;
        }, 1);
        cc.director.on("减少时间", () => {
            AD.audioMng.playSfx("错误");
            this.timeNum -= 5;
            if (this.timeNum <= 0) {
                this.timeNum = 0;
            }
            this.numShow.string = this.timeNum;
            this.node.children[1].scale = 1;
            cc.tween(this.node.children[1])
                .to(1, { y: 0, opacity: 0 })
                .call(() => {
                    this.node.children[1].scale = 0;
                    this.node.children[1].opacity = 255;
                    this.node.children[1].y = -40;
                })
                .start()
        }, this);
        cc.director.on("挖出一颗雷", () => {
            this.timeNum += 3;
            this.numShow.string = this.timeNum;
            this.node.children[2].scale = 1;
            cc.tween(this.node.children[2])
                .to(1, { y: 0, opacity: 0 })
                .call(() => {
                    this.node.children[2].scale = 0;
                    this.node.children[2].opacity = 255;
                    this.node.children[2].y = -40;
                })
                .start()
        }, this);
    },
    // update (dt) {},
});
