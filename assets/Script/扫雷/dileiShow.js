
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.num = 0;
        cc.director.on("挖出一颗雷", () => {
            if (this.num == 5) {
                return;
            }
            AD.audioMng.playSfx("发现地雷");
            this.node.children[this.num].children[0].active = false;
            this.node.children[this.num].children[1].active = true;
            this.num++;
            if (this.num == 5) {
                cc.director.emit("游戏胜利");
            }
        }, this);
    },

    // update (dt) {},
});
