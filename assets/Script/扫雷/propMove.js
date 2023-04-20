
cc.Class({
    extends: cc.Component,

    properties: {
        keng: cc.Prefab,
        wa: cc.Prefab,
        duigou: cc.Prefab,
        cuowu: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.originParentNode = this.node.parent;
        this.istouch = false;
        this.originX = this.node.x;
        this.originY = this.node.y;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.director.on("游戏失败", () => {
            this.node.opacity = 255;
            this.node.children[0].angle = 90;
            this.node.x = this.originX;
            this.node.y = this.originY;
            this.node.parent = this.originParentNode;
        }, this);
        cc.director.on("游戏胜利", () => {
            this.node.opacity = 255;
            this.node.children[0].angle = 90;
            this.node.x = this.originX;
            this.node.y = this.originY;
            this.node.parent = this.originParentNode;
        }, this);
    },
    onTouchStart(event) {
        this.istouch = false;
        this.node.parent = this.node.parent.parent;
        this.node.angle = -90;
        this.leiNode = null;
        this.node.y += 100;
        this.node.x += 50;
    },
    onTouchMove(event) {
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
    },
    onTouchEnd(event) {
        console.log(this.node.y);
        this.node.parent = this.originParentNode;
        console.log("see:" + this.node.y);
        if (this.node.y > 350 || this.node.y < -400) {
            this.node.angle = 0;
            this.node.x = this.originX;
            this.node.y = this.originY;
            return;
        }
        this.node.opacity = 0;
        if (this.istouch && this.leiNode.scale == 1) {
            this.node.opacity = 255;
            this.node.angle = 0;
            this.node.x = this.originX;
            this.node.y = this.originY;
            return;
        }
        var _wa = cc.instantiate(this.wa);
        _wa.parent = this.node.parent.parent;
        AD.audioMng.playSfx("铲子");
        _wa.x = this.node.x;
        _wa.y = this.node.y;
        this.scheduleOnce(() => {
            _wa.destroy();
            if (this.istouch) {
                this.leiNode.scale = 1;
                this.leiNode.getComponent(cc.CircleCollider).enable = false;
                for (var i = 0; i < Tools.fragArray.length; i++) {
                    if (this.leiNode == Tools.fragArray[i]) {
                        Tools.fragArray.splice(i, 1);
                    }
                }
                cc.director.emit("挖出一颗雷");
            } else {
                cc.director.emit("减少时间");
                var _keng = cc.instantiate(this.keng);
                _keng.parent = this.node.parent.parent.children[1];
                _keng.x = this.node.x;
                _keng.y = this.node.y;
                var _cuowo = cc.instantiate(this.cuowu);
                _cuowo.parent = this.node.parent.parent.children[1];
                _cuowo.x = this.node.x;
                _cuowo.y = this.node.y;
                this.scheduleOnce(() => {
                    _cuowo.destroy();
                }, 1)
            }
            this.node.opacity = 255;
            this.node.angle = 0;
            this.node.x = this.originX;
            this.node.y = this.originY;
        }, 0.8);
    },
    onCollisionEnter(other, self) {
        this.istouch = true;
        console.log("碰:" + other.node.scale);
        this.leiNode = other.node;
    },
    onCollisionStay(other, self) {

    },
    onCollisionExit(other, self) {
        console.log("离");
        this.istouch = false;
    },
    // update (dt) {},
});
