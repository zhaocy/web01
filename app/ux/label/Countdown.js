Ext.define('ux.label.Countdown', {
    alternateClassName: 'labelCountdown',
    extend: 'Ext.Component',
    xtype: 'labelCountdown',
    config: {
        baseCls: Ext.baseCSSPrefix + 'label',
        format: 'Y-m-d H:i:s',
        value: null
    },
    initialize: function () {
        this.callParent();
        this.on({
            hide: 'stop',
            scope: this
        });
    },
    stop: function () {
        console.log('停止计时');
        clearInterval(this.task);
        this.isStart = false;
    },
    start: function () {
        var me = this;
        if (!me.isStart && me.time) {
            console.log('开始计时');
            me.isStart = true;
            me.task = setInterval(function () {
                me.timing(me);
            },1000);
            me.timing(me);
        }
    },
    updateValue: function (time,old) {
        //console.log(time);
        var me = this;
        if (time) {
            time = Ext.Date.parse(time, me.getFormat());
            if (time) {
                me.time = time;
                me.start();
            }
        }
    },
    timing: function (me) {
        if (!me.time) {
            clearInterval(me.task);
            console.log('停止计时');
        } else {
            var now = new Date(),
                ms = me.time - now,
            //计算出开始时间和现在时间的时间戳差
                day = Math.floor(ms / (1000 * 60 * 60 * 24)),
            //天数
                hour = Math.floor(ms / (1000 * 60 * 60)) % 24,
            //小时
                minute = Math.floor(ms / (1000 * 60)) % 60,
            //分钟
                second = Math.floor(ms / 1000) % 60,
            //秒
                label;
            if (ms > 0) {
                console.log('正在计时');
                if (day > 0) {
                    label = util.format('剩余{0}天{1}小时{2}分{3}秒', day, hour, minute, second);
                } else if (hour > 0) {
                    label = util.format('剩余{0}小时{1}分{2}秒', hour, minute, second);
                } else if (minute > 0) {
                    label = util.format('剩余{0}分{1}秒', minute, second);
                } else if (second >= 0) {
                    label = util.format('剩余{0}秒', second);
                }
                me.setHtml(label);
            } else {
                console.log('计时结束');
                me.setHtml('已结束');
                me.fireEvent('end', me);
                clearInterval(me.task);
            }
        }
    }
});