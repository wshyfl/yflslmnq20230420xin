
cc.Class({
    extends: cc.Component,

    properties: {
        panelLei: cc.Node,
        panel: cc.Node,
        shouLeiArr: [cc.Prefab],
        sfxArr: {
            default: [],
            type: [cc.AudioClip]
        }
    },


    onLoad() {
        // this.keyData = "手雷模拟"+window.keyData;
        // cc.director.on("清除缓存", this.clearAllData, this);
        // this.clearAllData();
        // this.getData();

        this.initTouch();
        this.indexNow = -1;
        this.resetLei(0);
        this.couldChange = false;
        window.shouLeiGame = this;
    },

    start() {
        this.panel.parent.y = -cc.winSize.height / 2 + this.panel.height / 2;
    },
    resetLei(_index) {
        // if(this.couldChange==false)return;
        if (this.indexNow != _index) {
            this.indexNow = _index;
        }
        else return;


        
        for (var i = 0; i < this.panelLei.children.length; i++) {
            this.panelLei.children[i].destroy();
            

        }
        this.shouLeiNow = cc.instantiate(this.shouLeiArr[this.indexNow]);
        this.shouLeiNow.parent = this.panelLei;
        this.shouLeiNow.x = -720;
        this.scheduleOnce(() => {
            this.shouLeiNow.active = true;
        }, 0.1)
        this.shouLeiNow.getComponent("shouLeiItem").resetIndex(this.indexNow);


        if (window.xuanZhongSpr && window.normalSpr) {
            var _btnParent = this.panel;
            var _targetIndex = this.indexNow;
            for (var i = 0; i < 3; i++) {
                var _btn = _btnParent.children[i];
                if (i == _targetIndex)
                    _btn.getComponent(cc.Sprite).spriteFrame = window.xuanZhongSpr;
                else
                    _btn.getComponent(cc.Sprite).spriteFrame = window.normalSpr;
            }
        }

    },


    initTouch() {
        //按钮
        for (var i = 0; i < 3; i++) {
            this.panel.children[i].on("touchstart", (event) => {
                // window.audioMng.playSfx("按钮");
                this.unlockIndex = this.panel.children.indexOf(event.target);
                // if (!this.data.unlockState[this.unlockIndex])
                //     AD.showAD(this.unlockSucess, this);
                // else
                    this.unlockSucess();
            }, this);
        }
        // this.resetADIcon();

    },

    unlockSucess() {
        // this.data.unlockState[this.unlockIndex] = true;
        // this.saveData();
        // this.resetADIcon();

        this.resetLei(this.unlockIndex);

    },
    resetADIcon() {
        for (var i = 0; i < 3; i++)
            cc.find("icon_shiPin_2", this.panel.children[i]).active = !this.data.unlockState[i];
    },

    playSfx(_name, ...index) {
        var _volume = 1;
        var _sfxIndex = -1;
        var _loop = false;
        switch (_name) {
            case "手雷拉环":
                _sfxIndex = 0;
                break;
            case "爆炸":
                _sfxIndex = 1 + index[0];
                break;

        }
        if (_sfxIndex == -1) {
            console.warn("音频播放错误")
            return;
        }
        var _id = cc.audioEngine.play(this.sfxArr[_sfxIndex], _loop, _volume);

    },
    initCollision() {
        //普通碰撞初始化
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },
    clearAllData() {
        cc.sys.localStorage.removeItem(this.keyData);
    },
    saveData() {
        cc.sys.localStorage.setItem(this.keyData, JSON.stringify(this.data));
    },
    getData() {
        var _res = cc.sys.localStorage.getItem(this.keyData);
        console.log("数据: " + this.keyData + "   " + _res)
        if (_res) {
            this.data = JSON.parse(_res);
            console.log("非首次初始化数据: " + this.keyData + "   " + JSON.stringify(this.data))
        }
        else {
            //0单个炮 1鞭炮 2礼花炮
            this.data = {
                unlockState: [true, false, false]
            };
            this.saveData();
            console.log("首次初始化数据: " + this.keyData + "   " + this.data)
        }

    },
    //获得随机整数 上下限都包括
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },

    // update (dt) {},
});
