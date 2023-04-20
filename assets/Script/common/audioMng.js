

cc.Class({
    extends: cc.Component,

    properties: {
        bgmGame: cc.AudioClip,
        sfxArr: {
            default: [],
            type: [cc.AudioClip]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        AD.audioMng = this;
        this.sfxId = -1;
    },

    start() {
        this.couldPlaySfx = true;
        this.durationPlay = [0, 0, 0, 0, 0, 0, 0];//音效播放间隔

        this.durationCoin = 0;
        this.durationHit = 0;
        this.valume = 0;
        this.audioIndex = -1;
        this.dd1id = -1;
        this.dd2id = -1;
        this.dd3id = -1;
        this.playBGM = false;
        this.bgmType = null;
        this.xpcid = -1;
        this.huanhuNum = [4, 5, 6, 7];
    },

    playSfx(_name, ...index) {
        var _sfxIndex = -1;
        switch (_name) {
            case "按钮":
                _sfxIndex = 3;
                break;
            case "成功":
                _sfxIndex = 4;
                break;
            case "失败":
                _sfxIndex = 5;
                break;
            case "发现地雷":
                _sfxIndex = 6;
                break;
            case "错误":
                _sfxIndex = 7;
                break;
            case "铲子":
                _sfxIndex = 8;
                break;
            case "爆炸":
                _sfxIndex = 9;
                break;
            case "拉环":
                _sfxIndex = 10;
                break;
            case "c4滴":
                _sfxIndex = 11;
                break;
            case "c4按键":
                _sfxIndex = 12;
                break;
            case "引线":
                _sfxIndex = 13;
                break;
            case "燃烧瓶碎":
                _sfxIndex = 14;
                break;
            case "燃烧瓶烧":
                _sfxIndex = 15;
                break;
            case "燃烧瓶引线":
                _sfxIndex = 16;
                break;
            case "烟雾弹":
                _sfxIndex = 17;
                break;
            case "闪光弹":
                _sfxIndex = 18;
                break;
            case "冰冻":
                _sfxIndex = 19;
                break;
            case "电磁":
                _sfxIndex = 20;
                break;
            case "烟雾弹旋转":
                _sfxIndex = 21;
                break;
            case "烟雾弹打开":
                _sfxIndex = 22;
                break;
            case "闪光弹闪烁":
                _sfxIndex = 23;
                break;
            case "冰冻升起":
                _sfxIndex = 24;
                break;
            case "手雷闪烁":
                _sfxIndex = 25;
                break;
            case "扔":
                _sfxIndex = 26;
                break;
            case "飞金币":
                console.log("金币音效");
                _sfxIndex = 27;
                break;
            case "投掷冰冻":
                _sfxIndex = 28;
                break;
            case "激光":
                _sfxIndex = 29;
                break;
            case "碎片弹飞":
                _sfxIndex = 30;
                break;
            case "盖子":
                _sfxIndex = 31;
                break;
            case "拉拉环":
                _sfxIndex = 32;
                break;
            case "桶":
                _sfxIndex = 33;
                break;
            case "瓶子碎":
                _sfxIndex = 34;
                break;
        }
        if (_sfxIndex != -1) {
            // if (_sfxIndex == 3) {
            //     this.xpcid = cc.audioEngine.play(this.sfxArr[_sfxIndex], false, 1)
            // } else {
            var _id = cc.audioEngine.play(this.sfxArr[_sfxIndex], false, 1);
            // }
        }
    },

    playMusic() {
        this.audioIndex = cc.audioEngine.playMusic(this.bgmGame, true);
        console.log("播放背景音乐")
    },
    stopMusic() {
        this.playBGM = false;
        console.log("停止背景音乐")
        this.couldPlaySfx = false;
        cc.audioEngine.setVolume(this.audioIndex, 0);
    },
    playdd1Music() {
        this.dd1id = cc.audioEngine.play(this.sfxArr[0], true);
    },
    stopdd1Music() {
        cc.audioEngine.stop(this.dd1id);
    },
    playdd2Music() {
        this.dd2id = cc.audioEngine.play(this.sfxArr[1], true);
    },
    stopdd2Music() {
        cc.audioEngine.stop(this.dd2id);
    },
    playdd3Music() {
        this.dd3id = cc.audioEngine.play(this.sfxArr[2], true);
    },
    stopdd3Music() {
        cc.audioEngine.stop(this.dd3id);
    },
    playBingdongMusic() {
        this.dd3id = cc.audioEngine.play(this.sfxArr[24], true);
    },
    stopBingdongMusic() {
        cc.audioEngine.stop(this.dd3id);
    },
    playShanShuoMusic() {
        this.dd3id = cc.audioEngine.play(this.sfxArr[25], true);
    },
    stopShanShuoMusic() {
        cc.audioEngine.stop(this.dd3id);
    },
    playYanWuDanXuanZhuanMusic() {
        this.ywdxzid = cc.audioEngine.play(this.sfxArr[21], true);
    },
    stopYanWuDanXuanZhuanMusic() {
        cc.audioEngine.stop(this.ywdxzid);
    },
    update(dt) {

    },
});
