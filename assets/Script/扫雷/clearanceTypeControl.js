
cc.Class({
    extends: cc.Component,

    properties: {
        saoleiqi: cc.Node,
        di: cc.Node,
        lei: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.arrNum = [];
        Tools.fragArray = [];
        this.initFrag();
        this.leiNum = 0;
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);  
    },
    onTouchStart(event) {
        this.saoleiqi.active = true;
        var _touchPoint = event.getLocation();
        let move_pos = this.node.parent.convertToNodeSpaceAR(_touchPoint);
        this.saoleiqi.position = move_pos;
    },
    onTouchMove(event) {
        var _touchPoint = event.getLocation();
        let move_pos = this.node.parent.convertToNodeSpaceAR(_touchPoint);
        this.saoleiqi.position = move_pos;
    },
    onTouchEnd(event) {
        this.saoleiqi.active = false;
    },
    initFrag() {
        Tools.arrNum = Tools.randomNum(0, this.di.childrenCount - 1, 5);
        for (var i = 0; i < Tools.arrNum.length; i++) {
            var _effct = cc.instantiate(this.lei);
            _effct.parent = this.di.children[Tools.arrNum[i]];
            _effct.scale = 0;
            Tools.fragArray[i] = _effct;
        }
    }
    // update (dt) {},
});
