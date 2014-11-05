//公用类
Ext.define('app.util', {
    alternateClassName: 'util',
    statics: {
        //加载stroe
        storeLoad: function (list, params) {
            var store = list.getStore();
            if (params) {
                var oldParams = store.getProxy().getExtraParams();
                if (!this.equals(oldParams, params)) {
                    store.setProxy({
                        extraParams: params
                    });
                    store.removeAll();
                } else {
                    return;
                }
            } else if (store.getCount() > 0) {
                return
            }
            store.loadPage(1, {
                callback: function (records, operation, success) {
                    if (records.length == 0) {
                        list.setEmptyText('没有获取到内容');
                    }
                },
                scope: this
            });
        },
        //list->info公用加载方法
        recordLoad: function (record, view, url, params, ckName) {
            if (record.get(ckName)) {
                view.setRecord(record);
                return;
            }
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (result, request) {
                    result = Ext.decode(result.responseText);
                    record.set(result);
                    view.setRecord(record);
                }
            });
        },
        //保存单个数据
        saveRecord: function (from, store, model, id, me) {
            if (this.valid(model, from)) {
                model.save({
                    success: function (a, b) {
                        if (b.getAction() == 'create') {
                            model.set(id, b.getResultSet().getMessage());
                            store.add(model);
                            util.showMessage('添加成功', true);
                        } else {
                            //防止新增后再修改list不能及时更新
                            var values = from.getValues();
                            for (var item in values) {
                                model.set(item, values[item]);
                            }
                            util.showMessage('修改成功', true);
                        }
                        me.redirectTo('redirect');
                    },
                    failure: function (a, b) {
                        util.showMessage('操作失败', true);
                    }
                },
            this);
            }
        },
        //删除列表
        deleteRecord: function (list, items, params) {
            var store = list.getStore();
            Ext.Ajax.request({
                url: store.getDestroyUrl(),
                params: params,
                success: function (result, request) {
                    result = Ext.decode(result.responseText);
                    if (result.success) {
                        for (var i = 0,
                    ln = items.length; i < ln; i++) {
                            store.remove(items[i]);
                        }
                        util.showMessage('删除成功', true);
                    } else {
                        util.showMessage(result.message, true);
                    }
                }
            });
        },
        //验证模型
        valid: function (model, from) {
            from.updateRecord(model);
            var me = this,
            errors = model.validate(),
            valid = errors.isValid();
            if (!valid) {
                errors.each(function (err) {
                    me.showMessage(err.getMessage(), true);
                    return false;
                });
            }
            return valid;
        },
        //Viewport添加新项,Viewport之中始终只有一项
        ePush: function (xtype) {
            var me = Ext.Viewport,
            view = me.getActiveItem();
            if (view && view.getItemId() == xtype) {
                return;
            }
            view = Ext.create(xtype, {
                itemId: xtype
            });
            //切换
            me.animateActiveItem(view, {
                type: 'slide',
                direction: 'left'
            });
        },
        //监控Viewport界面切换,切换时销毁旧项(需要初始化)
        eActiveitemchange: function () {
            var me = Ext.Viewport;
            me.onAfter('activeitemchange',
            function (t, value, oldValue, eOpts) {
                if (oldValue) {
                    //强制销毁，防止销毁不完全引发错误
                    me.remove(oldValue, true);
                }
            });
        },
        /*为Ext.Viewport添加一个消息提示组件(需要初始化)*/
        addMessage: function () {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                cls: 'message',
                transparent: true,
                indicator: false
            });
            this.hideMessage();
        },
        /*显示一个消息提示*/
        showMessage: function (mes, autoHide) {
            var me = this,
            message = me.getMessage();
            message.setMessage(mes);
            message.show();
            //是否自动关闭提示
            if (autoHide) {
                setTimeout(function () {
                    message.hide();
                },
                1000);
            }
        },
        /*隐藏消息提示*/
        hideMessage: function () {
            this.getMessage().hide();
        },
        //消息组件
        getMessage: function () {
            return Ext.Viewport.getMasked();
        },
        //比较两个对象是否相等
        equals: function (x, y) {
            if (x === y) {
                return true;
            }
            if (!(x instanceof Object) || !(y instanceof Object)) {
                return false;
            }
            if (x.constructor !== y.constructor) {
                return false;
            }
            for (var p in x) {
                if (x.hasOwnProperty(p)) {
                    if (!y.hasOwnProperty(p)) {
                        return false;
                    }
                    if (x[p] === y[p]) {
                        continue;
                    }
                    if (typeof (x[p]) !== "object") {
                        return false;
                    }
                    if (!Object.equals(x[p], y[p])) {
                        return false;
                    }
                }
            }
            for (p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                    return false;
                }
            }
            return true;
        },
        //json数据转换成xml数据
        iterateJson: function (json) {
            var value = '',
            arr = [];
            for (var tag in json) {
                value = json[tag];
                if (Ext.isObject(value) || Ext.isArray(value)) {
                    value = this.iterateJson(value);
                }
                if (tag > -1) {
                    arr.push(value);
                } else if (value != null && value != '') {
                    arr.push(this.format('<{0}>{1}</{0}>', tag, value));
                }
            }
            return arr.join('');
        },
        //格式化字符串
        format: function () {
            return Ext.util.Format.format.apply(this, arguments);
        },
        //选择文件
        openFileSelector: function (url, source, destinationType, mediaType) {
            util.tmpUrl = url;
            /*
            *文件选择方式
            *navigator.camera.PictureSourceType.PHOTOLIBRARY：从文件夹中选取 0
            *navigator.camera.PictureSourceType.CAMERA:调用摄像头          1
            *navigator.camera.PictureSourceType.SAVEDPHOTOALBUM ：不明     2
            */
            source = source || 0; // navigator.camera.PictureSourceType.CAMERA;
            /*
            *文件返回格式
            *navigator.camera.DestinationType.DATA_URL：64位字符串      0
            *navigator.camera.DestinationType.FILE_URI:返回文件路径     1
            *navigator.camera.DestinationType.NATIVE_URI：返回系统路径  2 iOS：eg. assets-library://  Android： content://
            */
            destinationType = destinationType || 0;
            /*
            *媒体类型
            *navigator.camera.MediaType.PICTURE：图片                    0
            *navigator.camera.MediaType.VIDEO:视频 始终返回FILE_URI格式  1 
            *navigator.camera.MediaType.ALLMEDIA：支持任意文件选择       2
            */
            mediaType = mediaType || 0;
            var options = {
                //图像质量[0-100]
                quality: 50,
                destinationType: destinationType,
                sourceType: source,
                mediaType: mediaType
            };
            var uploadFile = destinationType == 0 ? this.uploadData : this.uploadFile;
            navigator.camera.getPicture(uploadFile, this.uploadBroken, options);
        },
        //文件选择失败 
        uploadBroken: function (message) {
            util.showMessage(message, true);
        },
        //以文件流模式上传
        uploadData: function (data) {
            util.showMessage('正在上传中,请等待...');
            Ext.Ajax.request({
                url: util.tmpUrl,
                hidMessage: true,
                params: {
                    img: data
                },
                success: util.uploadSuccess,
                failure: util.uploadFailed
            });
        },
        //以文件模式上传
        uploadFile: function (data) {
            var options = new FileUploadOptions();
            options.fileKey = "img";
            options.fileName = data.substr(data.lastIndexOf('/') + 1);
            options.mimeType = "multipart/form-data";
            options.chunkedMode = false;

            var ft = new FileTransfer();
            var uploadUrl = encodeURI(util.tmpUrl);
            ft.upload(data, uploadUrl, util.uploadSuccess, util.uploadFailed, options);
        },
        //文件上传成功
        uploadSuccess: function (r) {
            util.showMessage('上传成功！', true);
            //文件模式返回字段是r.response，文件流返回字段是r.responseText
        },
        //文件上传失败
        uploadFailed: function (error) {
            util.showMessage('上传失败！', true);
        },
        //显示pick
        showPick: function (xtype, params) {
            var pick = Ext.create(xtype);
            Ext.Viewport.add(pick);
            pick.show(params);
        },
        //结束pick
        endPick: function (xtype) {
            var pick = Ext.Viewport.down(xtype);
            if (pick) {
                pick.endPick();
            }
        },
        //重写ajax(需要初始化)
        overrideAjax: function () {
            var me = this;
            //开始加载
            Ext.Ajax.on('beforerequest',
            function (connection, options) {
                if (!options.hidMessage) {
                    me.showMessage('正在努力加载中...');
                }
            });
            //加载成功
            Ext.Ajax.on('requestcomplete',
            function (connection, options) {
                me.hideMessage();
            });
            //加载失败
            Ext.Ajax.on('requestexception',
            function (connection, options) {
                if (!options.hidMessage) {
                    me.showMessage('加载失败，请检查网络是否正常...', true);
                }
            });
        },
        //重写list(需要初始化)
        overrideList: function () {
            //重写分页插件
            Ext.define("Ext.zh.plugin.ListPaging", {
                override: "Ext.plugin.ListPaging",
                config: {
                    //自动加载
                    autoPaging: true,
                    //滚动到最底部时是否自动加载下一页数据
                    noMoreRecordsText: '没有更多内容了',
                    loadMoreText: '加载更多...' //加载更多按钮显示内容
                }
            });
            //重写下拉刷新
            Ext.define("Ext.zh.plugin.PullRefresh", {
                override: "Ext.plugin.PullRefresh",
                config: {
                    lastUpdatedText: '上次刷新时间：',
                    loadedText: '等一会再刷新吧...',
                    loadingText: '加载中...',
                    pullText: '下拉可以手动刷新',
                    releaseText: '松开可以刷新',
                    lastUpdatedDateFormat: 'Y-m-d H:i'
                }
            });
            //重写List
            Ext.define("Ext.zh.List", {
                override: "Ext.List",
                config: {
                    //取消选择效果
                    selectedCls: '',
                    //禁用加载遮罩，防止跳转时页面卡顿，使用统一的遮罩效果
                    loadingText: false,
                    cls: 'list',
                    deferEmptyText: false,
                    emptyText: '没有更多内容了'
                }
            });
        },
        //重写Pick相关(需要初始化)
        overridePick: function () {
            Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            Ext.define("Ext.zh.DatePicker", {
                override: "Ext.picker.Date",
                config: {
                    yearFrom: 2000,
                    monthText: '月',
                    dayText: '日',
                    yearText: '年'
                }
            });
            Ext.define("Ext.local_zh_cn.Picker", {
                override: "Ext.picker.Picker",
                applyDoneButton: function (config) {
                    if (config) {
                        if (Ext.isBoolean(config)) {
                            config = {};
                        }
                        if (typeof config == "string") {
                            config = {
                                text: config
                            };
                        }
                        Ext.applyIf(config, {
                            ui: 'action',
                            align: 'right',
                            text: '确定'
                        });
                    }
                    return Ext.factory(config, 'Ext.Button', this.getDoneButton());
                },
                applyCancelButton: function (config) {
                    if (config) {
                        if (Ext.isBoolean(config)) {
                            config = {};
                        }
                        if (typeof config == "string") {
                            config = {
                                text: config
                            };
                        }
                        Ext.applyIf(config, {
                            align: 'left',
                            text: '取消'
                        });
                    }
                    return Ext.factory(config, 'Ext.Button', this.getCancelButton());
                }

            });
        },
        //app初始化执行
        inIt: function () {
            this.overrideList();
            this.overrideAjax();
            this.addMessage();
            this.overridePick();
        }
    }
});