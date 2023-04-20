
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.children[0].children[0].active = false;
        this.originX = this.node.x;
        this.originY = this.node.y;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.istouch = false;
        this.isPlaydd1 = false;
        this.isPlaydd2 = false;
        this.isPlaydd3 = false;
        this.isPlaydd4 = false;
        this.isPlaydd5 = false;
        cc.director.on("游戏失败", () => {
            this.node.children[0].children[0].active = false;
            this.node.angle = 0;
            this.istouch = false;
            this.node.x = this.originX;
            this.node.y = this.originY;
        }, this);
        cc.director.on("游戏胜利", () => {
            this.node.children[0].children[0].active = false;
            this.node.angle = 0;
            this.istouch = false;
            this.node.x = this.originX;
            this.node.y = this.originY;
        }, this);
    },
    onTouchStart(event) {
        this.istouch = true;
        this.node.angle = -90;
        this.node.y += 200;
        this.node.x += 50;
    },
    onTouchMove(event) {
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
        if (this.node.y > (this.coh / 2 - (this.node.height / 2))) {
            this.node.y = (this.coh / 2 - (this.node.height / 2));
        } else if (this.node.y < -(this.coh / 2 - (this.node.height / 2))) {
            this.node.y = -(this.coh / 2 - (this.node.height / 2));
        } else if (this.node.x < -(this.cow / 2 - (this.node.height / 2))) {
            this.node.x = -(this.cow / 2 - (this.node.height / 2));
        } else if (this.node.x > (this.cow / 2 - (this.node.height / 2))) {
            this.node.x = (this.cow / 2 - (this.node.height / 2));
        }
    },
    onTouchEnd(event) {
        this.node.children[0].children[0].active = false;
        this.node.angle = 0;
        this.istouch = false;
        this.node.x = this.originX;
        this.node.y = this.originY;
        AD.audioMng.stopdd1Music();
        AD.audioMng.stopdd2Music();
        AD.audioMng.stopdd3Music();
    },
    update(dt) {
        if (this.istouch) {
            this.xiao = 100000000000000000000000000000000;
            for (var i = 0; i < Tools.fragArray.length; i++) {
                var xiao = Tools.getDistance(this.node.position, Tools.fragArray[i].parent.position)
                if (xiao < this.xiao) {
                    this.xiao = xiao;
                    this.nowLei = Tools.fragArray[i];
                }
            }
            if (this.xiao < 50) {
                if (this.isPlaydd1) {

                } else {
                    this.isPlaydd1 = true;
                    console.log("播dd3");
                    this.node.children[0].children[0].active = true;
                    AD.audioMng.playdd3Music();
                    AD.audioMng.stopdd2Music();
                    AD.audioMng.stopdd1Music();
                    this.isPlaydd2 = false;
                    this.isPlaydd3 = false;
                    this.isPlaydd4 = false;
                    this.isPlaydd5 = false;
                }
            } else if (this.xiao < 100 && this.xiao >= 50) {
                if (this.isPlaydd2) {

                } else {
                    this.isPlaydd2 = true;
                    console.log("播dd2");
                    this.node.children[0].children[0].active = false;
                    AD.audioMng.stopdd1Music();
                    AD.audioMng.playdd2Music();
                    AD.audioMng.stopdd3Music();
                    this.isPlaydd1 = false;
                    this.isPlaydd3 = false;
                    this.isPlaydd4 = false;
                    this.isPlaydd5 = false;
                }
            } else if (this.xiao < 150 && this.xiao >= 100) {
                if (this.isPlaydd3) {

                } else {
                    this.isPlaydd3 = true;
                    console.log("播dd1");
                    this.node.children[0].children[0].active = false;
                    AD.audioMng.stopdd2Music();
                    AD.audioMng.playdd1Music();
                    AD.audioMng.stopdd3Music();
                    this.isPlaydd1 = false;
                    this.isPlaydd2 = false;
                    this.isPlaydd4 = false;
                    this.isPlaydd5 = false;
                }
            } else if (this.xiao < 200 && this.xiao >= 150) {

            } else if (this.xiao >= 200) {
                AD.audioMng.stopdd1Music();
                AD.audioMng.stopdd2Music();
                AD.audioMng.stopdd3Music();
                this.isPlaydd1 = false;
                this.isPlaydd2 = false;
                this.isPlaydd3 = false;
                this.isPlaydd4 = false;
                this.isPlaydd5 = false;
            }
        }
    },
});
