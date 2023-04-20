cc.Class({
    extends: cc.Component,

    properties: {
        
    }, 

    // onLoad () {},
    start() {
        this.node.scale = 0;
        this.originX = this.node.x;
        this.originY = this.node.y;
        this.ani = this.node.children[0].getComponent(sp.Skeleton);
        this.coh = cc.winSize.height;
        this.cow = cc.winSize.width;  
        this.isPeng = false;
        this.isClick = false;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.director.on("点燃", () => {

        }, this);
        cc.director.on("出现打火机", () => {
            this.isPeng = false;
            this.node.scale = 1;
        }, this);
        cc.director.on("打火机消失", () => {
            this.node.scale = 0;
            this.node.x = this.originX;
            this.node.y = this.originY;
        }, this);
    },
    onTouchStart(event) {
        this.isClick = true;
        this.isFire();
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
        this.isClick = false;
        this.isFireOver();
    },
    isFire() {
        this.ani.setAnimation(0, "act", true);
    },
    isFireOver() {
        this.ani.setAnimation(0, "daiji", true);
    },
    onCollisionEnter(other, self) {
        if (this.isPeng) {
            return;
        }
        if (!this.isClick) {
            return;
        }
        this.isPeng = true;
        cc.director.emit("点燃");
    },
    onCollisionStay(other, self) {
        if (this.isPeng) {
            return;
        }
        if (!this.isClick) {
            return;
        }
        this.isPeng = true;
        cc.director.emit("点燃");
    },
    onCollisionExit(other, self) {

    },
    // update (dt) {},
});
