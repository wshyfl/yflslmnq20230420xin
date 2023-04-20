
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("炸上层", () => {
            if (this.node.parent.name == "jiuping") {
                AD.audioMng.playSfx("瓶子碎");
            } else if (this.node.parent.name == "youtong") {
                AD.audioMng.playSfx("桶");
            }
            if (this.node.name == "shangceng") {
                Tools.ZhaShang = true;
                this.node.children.forEach(element => {
                    element.children[0].active = false;
                    element.children[1].active = true;
                    element.children[2].active = false;
                });
                cc.tween(this.node)
                    .delay(2)
                    .to(0.8, { opacity: 0 })
                    .call(() => {
                        this.node.opacity = 255;
                        this.node.children.forEach(element => {
                            element.children[0].active = true;
                            element.children[1].active = false;
                            element.children[2].active = false;
                        });
                    })
                    .start();
            }
        }, this);
        cc.director.on("炸下层", () => {
            if (this.node.parent.name == "jiuping") {
                AD.audioMng.playSfx("瓶子碎");
            } else if (this.node.parent.name == "youtong") {
                AD.audioMng.playSfx("桶");
            }
            if (this.node.name == "xiaceng") {
                Tools.ZhaXia = true;
                this.node.children.forEach(element => {
                    element.children[0].active = false;
                    element.children[1].active = true;
                    element.children[2].active = false;
                });
                cc.tween(this.node)
                    .delay(2)
                    .to(0.8, { opacity: 0 })
                    .call(() => {
                        this.node.opacity = 255;
                        this.node.children.forEach(element => {
                            element.children[0].active = true;
                            element.children[1].active = false;
                            element.children[2].active = false;
                        });
                    })
                    .start();
            }
        }, this);
        cc.director.on("冻上层", () => {
            if (this.node.name == "shangceng") {
                this.node.children.forEach(element => {
                    element.children[2].active = true;
                });
            }
        }, this);
        cc.director.on("冻下层", () => {
            if (this.node.name == "xiaceng") {
                this.node.children.forEach(element => {
                    element.children[2].active = true;
                });
            }

        }, this);
    },
    isZhaOver() {
        if (Tools.ZhaShang && Tools.ZhaXia) {
            cc.director.emit("炸完了");
        }
        Tools.ZhaShang = false;
        Tools.ZhaXia = false;
    },
    onDestroy() {
        this.unscheduleAllCallbacks();
    }
    // update (dt) {},
});
