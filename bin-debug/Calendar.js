var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super.call(this) || this;
        _this.skinName = "/resource/game-skin/CalendarSkin.exml";
        _this.addEventListener(egret.Event.COMPLETE, _this.uiComplete, _this);
        return _this;
    }
    Calendar.prototype.uiComplete = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.uiComplete, this);
        this.initUI();
        this.initListener();
        this.initSetting();
    };
    /** get an instance of the calendar component */
    Calendar.getInstance = function () {
        if (!this.instance) {
            this.instance = new Calendar();
        }
        return this.instance;
    };
    // -------------------------------------- application interface --------------------------------------
    /** get the javascript timestamp of selected date */
    Calendar.prototype.getSelectedDate = function () {
        return this.selectedDate || Date.now();
    };
    /** set the position & size ( width ) of the calendar
     * @param x {number} x of the calendar
     * @param y {number} y of the calendar
     * @param y {number} width of the calendar (>=600)
     */
    Calendar.prototype.setPosition = function (x, y, width) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 950; }
        width = width || 950;
        width = Math.max(width, 600);
        this.x = x;
        this.y = y;
        this.scaleX = width / 950;
        this.scaleY = width / 950;
    };
    // width = 130 * 7 + 2 * 20  = 950
    // height = 115 * 8
    // -------------------------------------- init --------------------------------------
    /** init ui status */
    Calendar.prototype.initUI = function () {
        // set bgd visible
        for (var i = 0; i <= 5; i++) {
            for (var j = 0; j <= 6; j++) {
                this["date_" + i + "_" + j].getChildByName("bgd").visible = false;
            }
        }
        // set frame visible
        this.groupFrame.visible = false;
        this.bgdToday.visible = false;
    };
    Calendar.prototype.initSetting = function () {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.currentDay = new Date().getDate();
        this.shownYear = this.currentYear;
        this.shownMonth = this.currentMonth;
    };
    Object.defineProperty(Calendar.prototype, "shownMonth", {
        get: function () { return this._shownMonth; },
        set: function (v) {
            v = (v + 12) % 12;
            this._shownMonth = v;
            this.setCalendar();
        },
        enumerable: true,
        configurable: true
    });
    // -------------------------------------- event listener --------------------------------------
    Calendar.prototype.initListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.handleMouse, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.handleMouse, this);
    };
    Calendar.prototype.handleTap = function (evt) {
        switch (evt.target) {
            case this.btnCurrentTime:
                break;
            case this.btnNext:
                this.goNextMonth();
                break;
            case this.btnPrevious:
                this.goPreviousMonth();
                break;
            default:
                if (evt.target.name && evt.target.name.indexOf("date_") > -1) {
                    this.groupFrame.visible = true;
                    this.groupFrame.x = evt.target.x;
                    this.groupFrame.y = evt.target.y + 115;
                    this.selectedDate = this.getTimeByName(evt.target.name);
                    var month = new Date(this.selectedDate).getMonth();
                    if (this.shownMonth == 0 && month == 11) {
                        this.goPreviousMonth();
                        return;
                    }
                    if (this.shownMonth == 11 && month == 0) {
                        this.goNextMonth();
                        return;
                    }
                    if (this.shownMonth > month) {
                        this.goPreviousMonth();
                        return;
                    }
                    if (this.shownMonth < month) {
                        this.goNextMonth();
                        return;
                    }
                }
                break;
        }
    };
    Calendar.prototype.goNextMonth = function () {
        if (this.shownMonth == 11) {
            this.shownYear++;
        }
        this.shownMonth = this.shownMonth + 1;
    };
    Calendar.prototype.goPreviousMonth = function () {
        if (this.shownMonth == 0) {
            this.shownYear--;
        }
        this.shownMonth = this.shownMonth - 1;
    };
    Calendar.prototype.handleMouse = function (evt) {
        var name = evt.target.name;
        if (name && name.indexOf("date_") > -1) {
            var bgd = evt.target.getChildByName("bgd");
            bgd.visible = evt.type == mouse.MouseEvent.MOUSE_OVER;
        }
    };
    // -------------------------------------- handle ui --------------------------------------
    /** set text and style of each date */
    Calendar.prototype.setCalendar = function () {
        this.groupFrame.visible = false;
        this.bgdToday.visible = false;
        var currentMonthDay;
        var lastMonthDay;
        currentMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf(this.shownMonth + 1) > -1 ? 31 : 30;
        lastMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf((this.shownMonth - 1) % 12 + 1) > -1 ? 31 : 30;
        // lastMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf((this.shownMonth + 12 - 1) % 12 + 1) > -1 ? 31 : 30;
        if (this.shownMonth == 1) {
            currentMonthDay = this.isLeapYear(this.shownYear) ? 29 : 28;
        }
        if (this.shownMonth == 2) {
            lastMonthDay = this.isLeapYear(this.shownYear) ? 29 : 28;
        }
        var fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
        fixNum = fixNum == 0 ? 7 : fixNum;
        for (var x = 0; x < 6; x++) {
            for (var y = 0; y < 7; y++) {
                var group = this["date_" + x + "_" + y];
                var txt = group.getChildByName("txt");
                var date = (x * 7 + y + 1) - (fixNum - 1);
                txt.textColor = 0xffffff;
                if (date <= 0) {
                    date = date + lastMonthDay;
                    txt.textColor = 0xaaaaaa;
                }
                else if (date > currentMonthDay) {
                    date = date - currentMonthDay;
                    txt.textColor = 0xaaaaaa;
                }
                txt.text = date + "";
                var time = this.getTimeByName("date_" + x + "_" + y);
                if (this.selectedDate == time) {
                    this.groupFrame.visible = true;
                    this.groupFrame.x = group.x;
                    this.groupFrame.y = group.y + 115;
                }
                var today = new Date(this.currentYear, this.currentMonth, this.currentDay).getTime();
                if (today == time) {
                    this.bgdToday.visible = true;
                    this.bgdToday.x = group.x;
                    this.bgdToday.y = group.y + 115;
                }
            }
        }
        this.btnCurrentTime.label = this.shownYear + "/" + this.getStrOfLen2(this.shownMonth + 1);
    };
    // -------------------------------------- util --------------------------------------
    /** get timestamp by target.name ( hour=0, min=0, sec=0 )
     * @return {number}
     */
    Calendar.prototype.getTimeByName = function (name) {
        var numStr = name.split("_");
        var x = +numStr[1];
        var y = +numStr[2];
        var num = x * 7 + y + 1;
        var nowTime = new Date(this.shownYear, this.shownMonth, 1).getTime();
        var fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
        fixNum = fixNum == 0 ? 7 : fixNum;
        var distance = num - (fixNum - 1);
        return nowTime + 1000 * 60 * 60 * 24 * (distance - 1);
    };
    /** get a string of length 2
     * @param num {number} integer from 0 to 99
     * @return {string} string of length 2
     */
    Calendar.prototype.getStrOfLen2 = function (num) {
        return ((num | 0) / 100).toFixed(2).slice(2);
    };
    /** whether the input year is a leap year
     * @param year {number} integer
     */
    Calendar.prototype.isLeapYear = function (year) {
        return !(year % (year % 100 ? 4 : 400));
    };
    // -------------------------------------- dispose --------------------------------------
    Calendar.prototype.dispose = function () {
    };
    return Calendar;
}(eui.Component));
__reflect(Calendar.prototype, "Calendar");
//# sourceMappingURL=Calendar.js.map