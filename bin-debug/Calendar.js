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
        return _this;
    }
    Calendar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
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
    /** set the position & size of the calendar
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
    };
    return Calendar;
}(eui.Component));
__reflect(Calendar.prototype, "Calendar");
//# sourceMappingURL=Calendar.js.map