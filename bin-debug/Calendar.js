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
        return 0;
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
    };
    // -------------------------------------- variables --------------------------------------
    // -------------------------------------- properties --------------------------------------
    // -------------------------------------- event listener --------------------------------------
    Calendar.prototype.initListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        // this.addEventListener(MouseEvent. , this.handleTap, this);
    };
    Calendar.prototype.handleTap = function (evt) {
        switch (evt.target) {
            case this.btnCurrentTime:
                break;
            case this.btnNext:
                break;
            case this.btnPrevious:
                break;
            default:
                if (evt.target.name && evt.target.name.indexOf("date_") > -1) {
                    console.log("tap", evt.target.name);
                    this.groupFrame.visible = true;
                    this.groupFrame.x = evt.target.x;
                    this.groupFrame.y = evt.target.y + 115;
                }
                break;
        }
    };
    // -------------------------------------- handle ui --------------------------------------
    // -------------------------------------- util --------------------------------------
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