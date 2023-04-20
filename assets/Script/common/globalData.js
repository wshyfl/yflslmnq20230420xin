window.globalData = {
    
    clearDataNow: false,//清除数据吗? 
    keyFirst: "key_firstslmnq",
    keyData: "key_dataslmnq",
    firstToMenu: false,

    kaiguan: false,//远程开关

    data: {
        coinNum: 0,//金币数   
        //当前使用手雷
        nowFrag: 0,
        signDay: null,
        unlockFrag: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //连续签到日0-6
        signContinuous: 0,
        turnDay: null,
    },
    getSignContinuous() {
        return this.data.signContinuous;
    },
    setSignContinuous() {
        this.data.signContinuous += 1;
        this.saveData();
    },
    getSignDay() {
        return globalData.data.signDay;
    },
    setSignDay() {
        this.data.signDay = Tools.getNowFormatDate();
        this.saveData();
    },
    setUnlockFrag(num) {
        this.data.unlockFrag[num] = 1;
        this.data.nowFrag = num;
        this.saveData();
    },
    getCoinNum() {
        return this.data.coinNum;
    },
    setCoinNum(_addNum) {
        if (this.data.coinNum + _addNum >= 0) {
            this.data.coinNum += _addNum;
            this.saveData();
            return true;
        }
        return false;
    },

    getDataAll() {
        // return;
        if (this.clearDataNow)
            globalData.clearAllData();
        cc.debug.setDisplayStats(false);

        if (cc.sys.localStorage.getItem(globalData.keyFirst) != 1) {
            cc.sys.localStorage.setItem(globalData.keyFirst, 1);
            globalData.saveData();
            cc.log("首次进入游戏")
            globalData.data = globalData.getData();
        }
        else {
            cc.log("非首次进入游戏 " + cc.sys.localStorage.getItem(globalData.keyFirst))
            globalData.data = globalData.getData();

        }
    },
    clearAllData() {
        cc.sys.localStorage.removeItem(globalData.keyFirst);
        cc.sys.localStorage.removeItem(globalData.keyData);
    },
    saveData() {
        cc.sys.localStorage.setItem(globalData.keyData, JSON.stringify(globalData.data));
    },
    getData() {
        var _res = cc.sys.localStorage.getItem(globalData.keyData);
        console.log("_res = " + _res)
        if (_res != null)
            return JSON.parse(_res);

    },
}
