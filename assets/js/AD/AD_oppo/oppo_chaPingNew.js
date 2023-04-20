

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        icon: cc.Node,
        btnClose: cc.Node,

    },

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.durationShow = 10;//插屏间隔
        this.couldShowChaPing = true;

        this.requestDuration = 1;//请求间隔 标准数值==> 防止短时间内请求两次
        this.requestDurationTemp = 0;//请求间隔 计数数值==> 防止短时间内请求两次

        this.node.scale = 0;
        this.bg.active = this.icon.active = true;



    },


    start() {

        cc.director.on("显示原生大插屏", () => {
            if (!AD_oppo.chaPingBoo) {
                console.warn("chaPingBoo 为 false")
                return;
            }
            if (!this.couldShowChaPing) {
                console.warn("插屏 广告时间间隔太短 还不能加载");
                return;
            }
            if (this.requestDurationTemp > 0) {
                console.warn("插屏 短时间内 请求了两次广告")
                return;
            }
            if (this.node.scale > 0) {
                console.warn("插屏 广告正在展示 不能重复请求")
                return;
            }
            console.log("插屏111111111111111111")
            this.loadData();//加载数据
            this.requestDurationTemp = 999;
            setTimeout(() => {
                this.requestDurationTemp = 0;
            }, this.requestDuration * 1000);

        }, this);



        //广告点击
        this.bg.on("touchend", () => {
            console.log("插屏 aaaaaaaaaaaaaa")
            this.reportAdClick();//广告点击上报
        }, this);
        //广告点击
        this.btnClose.on("touchend", () => {
            console.log("bbbbbbbbbbb")
            if (this.random(1, 100) < 15) {
                console.log("插屏 cccccccccc")

                this.reportAdClick();//广告点击上报
            }
            else {
                console.log("插屏 ddddddddddd")

                this.colseAD();//关闭广告
            }
        }, this);
    },

    //绘制加载的数据
    resetShow() {
        var result = this.result;
        if (result != null) {
            console.log("插屏 广告展示成功")
            this.node.x = cc.winSize.width / 2;
            this.node.y = cc.winSize.height / 2;
            this.scheduleOnce(() => {

                this.node.scale = 1;
            }, 0.2)
            this.reportAdShow();
            //显示logo
            var imgUrl = null;
            var remoteUrl = result.icon;
            if (result.imgUrlList.length > 0)
                imgUrl = result.imgUrlList[0];
            else if (result.iconUrlList.length > 0)
                imgUrl = result.iconUrlList[0];

            var _iconSpr = this.icon.getComponent(cc.Sprite)
            var _bgSpr = this.bg.getComponent(cc.Sprite)
            if (remoteUrl != "") {
                this.icon.active = true;

                cc.assetManager.downloader.downloadDomImage(remoteUrl, { ext: '.png' }, (err, texture) => {
                    if (err) {
                        console.log("插屏绘制错误   " + err);
                    } else {
                        let textureT = new cc.Texture2D();
                        textureT.initWithElement(texture);
                        var spriteFrame = new cc.SpriteFrame(textureT);
                        _iconSpr.spriteFrame = spriteFrame;

                    }
                })

            } else {
                this.icon.active = false;
            }

            if (imgUrl != null) {
                console.log("插屏绘制 000 ");

                cc.assetManager.downloader.downloadDomImage(imgUrl, { ext: '.png' }, (err, texture) => {
                    if (err) {
                        console.log("插屏绘制错误   " + err);
                    } else {
                        let textureT = new cc.Texture2D();
                        textureT.initWithElement(texture);
                        var spriteFramelogo = new cc.SpriteFrame(textureT);
                        _bgSpr.spriteFrame = spriteFramelogo;
                    }
                })
                // cc.assetManager.loadRemote(imgUrl, { ext: '.png' }, function (err, texture) {
                //     if (err) {
                //         console.log("插屏绘制错误   "+err);
                //     } else {
                //         var spriteFramelogo = new cc.SpriteFrame(texture);
                //         _bgSpr.spriteFrame = spriteFramelogo;
                //     }
                // });
            }

            // var pngStr = ".png";
            // var pngBoo = imgUrl.indexOf(pngStr) >= 0;
            // var jpgStr = ".jpg";
            // var jpbBoo = imgUrl.indexOf(jpgStr) >= 0;
            // if (pngBoo || jpbBoo) {
            //     var urlString = imgUrl.split("?");
            //     cc.assetManager.loadRemote(urlString[0], function (err, texture) {
            //         if (err) {
            //             console.log("bg绘制错误 " + err);
            //             return
            //         }
            //         var spriteFramelogo = new cc.SpriteFrame(texture);
            //         _bgSpr.spriteFrame = spriteFramelogo;

            //     });
            // } else {
            //     cc.assetManager.loadRemote(imgUrl, { ext: '.png' }, function (err, texture) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             var spriteFramelogo = new cc.SpriteFrame(texture);
            //             _bgSpr.spriteFrame = spriteFramelogo;
            //         }
            //     });
            // }
        }
    },
    //关闭广告
    colseAD() {
        this.node.scale = 0;
        this.couldShowChaPing = false;
        setTimeout(() => {
            this.couldShowChaPing = true;
        }, this.durationShow * 1000)
    },
    //广告点击上报
    reportAdClick() {
        var result = this.result;
        var nativeAd = this.nativeAd;
        if (result != null) {
            nativeAd.reportAdClick({
                adId: result.adId.toString()
            });
            console.log("插屏 点击上报~")
            this.colseAD();
        }
    },
    //广告展示上报
    reportAdShow() {
        var result = this.result;
        var nativeAd = this.nativeAd;
        if (result != null) {
            nativeAd.reportAdShow({
                adId: result.adId.toString()
            });
            console.log("插屏 展示上报~")
        }
    },
    //获得随机整数 上下限都包括
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },

    nativeAd: null,
    /**原生插屏 */
    loadData() {
        if (AD.chanelName != AD.chanelName1 || AD.chanelName1 != "oppo")
            return;
        console.log("插屏 数据加载 开始");

        var self = this;

        self.nativeAd = qg.createNativeAd({
            adUnitId: AD_oppo.chaPing_TT,
        });
        self.nativeAd.load();

        self.nativeAd.onError(function (err) {
            console.log("插屏数据加载失败" + JSON.stringify(err))
            self.nativeAd.offError();
            self.nativeAd.offLoad();
        })
        self.nativeAd.onLoad(function (res) {
            console.log('插屏数据加载成功', JSON.stringify(res));
            if (res && res.adList) {
                var data = res.adList;
                var listData = JSON.stringify(data);// 转成JSON格式
                var list = JSON.parse(listData);
                self.result = list[list.length - 1];

                self.reportingBoo = false;

                self.resetShow();//绘制加载的数据
            }
            self.nativeAd.offError();
            self.nativeAd.offLoad();
        });

    },
    // update (dt) {},
});
