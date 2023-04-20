

cc.Class({
    extends: cc.Component,

    properties: {
        bar: cc.Sprite,
    },
    onLoad() {
        globalData.getDataAll();
        Tools.isShowXg = false;
        Tools.gameType = 0;
        Tools.isTanShiPin = false;
        // this.initCollision(); 
        Tools.ZhaShang = false;
        Tools.ZhaXia = false;
    },

    start() {
        this.bar.fillRange = 0;
        cc.tween(this.bar)
            .delay(0.5)
            .to(3, { fillRange: 1 })
            .call(() => {
                cc.director.loadScene("Menu");
            })
            .start();
    },
    initCollision() {
        //重力碰撞初始化
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);//重力速度  -640代表 每秒移动640像素

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;

        //普通碰撞初始化
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },
});
