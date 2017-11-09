class Calendar extends eui.Component {

    public constructor() {
        super();
        this.skinName = "/resource/game-skin/CalendarSkin.exml";
        this.addEventListener(egret.Event.COMPLETE, this.uiComplete, this);
    }

    private uiComplete(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.uiComplete, this);
        this.initUI();
        this.initListener();
        this.initSetting();
    }

    private static instance: Calendar;

    /** get an instance of the calendar component */
    public static getInstance(): Calendar {
        if (!this.instance) {
            this.instance = new Calendar();
        }
        return this.instance;
    }

    // -------------------------------------- application interface --------------------------------------

    /** get the javascript timestamp of selected date */
    public getSelectedDate(): number {
        return 0;
    }

    /** set the position & size ( width ) of the calendar
     * @param x {number} x of the calendar
     * @param y {number} y of the calendar
     * @param y {number} width of the calendar (>=600)
     */
    public setPosition(x: number = 0, y: number = 0, width: number = 950): void {
        width = width || 950;
        width = Math.max(width, 600);
        this.x = x;
        this.y = y;
        this.scaleX = width / 950;
        this.scaleY = width / 950;
    }

    // width = 130 * 7 + 2 * 20  = 950
    // height = 115 * 8

    // -------------------------------------- init --------------------------------------

    /** init ui status */
    private initUI(): void {
        // set bgd visible
        for (let i = 0; i <= 5; i++) {
            for (let j = 0; j <= 6; j++) {
                (<eui.Group>this["date_" + i + "_" + j]).getChildByName("bgd").visible = false;
            }
        }
        // set frame visible
        this.groupFrame.visible = false;
        this.bgdToday.visible = false;
    }

    private initSetting(): void {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.currentDay = new Date().getDate();
        this.shownYear = this.currentYear;
        this.shownMonth = this.currentMonth;
    }

    // -------------------------------------- skin Component --------------------------------------

    /** current time btn */
    private btnCurrentTime: eui.Button;
    /** previous page btn */
    private btnPrevious: eui.Button;
    /** next page btn */
    private btnNext: eui.Button;

    /** container of the dates group ( date_0_0 -> date_5_6 ) */
    private groupDays: eui.Group;

    /** frame style of hovered date */
    private groupFrame: eui.Group;

    /** bgd of current date */
    private bgdToday: eui.Group;

    // -------------------------------------- variables --------------------------------------

    // -------------------------------------- properties --------------------------------------

    private shownYear: number;

    private _shownMonth: number;
    private get shownMonth(): number { return this._shownMonth; }
    private set shownMonth(v: number) {
        v = (v + 12) % 12;
        this._shownMonth = v;
        this.setCalendar();
    }

    /**  */
    private currentYear: number;
    /**  */
    private currentMonth: number;
    /**  */
    private currentDay: number;

    private selectedDate: number;

    // -------------------------------------- event listener --------------------------------------

    private initListener(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.handleMouse, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.handleMouse, this);
    }

    private handleTap(evt: egret.TouchEvent): void {
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
                if (evt.target.name && (<string>evt.target.name).indexOf("date_") > -1) {
                    this.groupFrame.visible = true;
                    this.groupFrame.x = evt.target.x;
                    this.groupFrame.y = evt.target.y + 115;
                    this.selectedDate = this.getTimeByName(evt.target.name);
                    let month = new Date(this.selectedDate).getMonth();
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
    }

    private goNextMonth(): void {
        if (this.shownMonth == 11) {
            this.shownYear++;
        }
        this.shownMonth = this.shownMonth + 1;
    }

    private goPreviousMonth(): void {
        if (this.shownMonth == 0) {
            this.shownYear--;
        }
        this.shownMonth = this.shownMonth - 1;
    }

    private handleMouse(evt: egret.TouchEvent): void {
        let name: string = evt.target.name;
        if (name && name.indexOf("date_") > -1) {
            let bgd: eui.Rect = (<eui.Rect>(<eui.Group>evt.target).getChildByName("bgd"));
            bgd.visible = evt.type == mouse.MouseEvent.MOUSE_OVER;
        }
    }

    // -------------------------------------- handle ui --------------------------------------

    /** set text and style of each date */
    private setCalendar(): void {
        this.groupFrame.visible = false;
        this.bgdToday.visible = false;
        let currentMonthDay;
        let lastMonthDay;
        currentMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf(this.shownMonth + 1) > -1 ? 31 : 30;
        lastMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf((this.shownMonth - 1) % 12 + 1) > -1 ? 31 : 30;
        // lastMonthDay = [1, 3, 5, 7, 8, 10, 12].indexOf((this.shownMonth + 12 - 1) % 12 + 1) > -1 ? 31 : 30;
        if (this.shownMonth == 1) {
            currentMonthDay = this.isLeapYear(this.shownYear) ? 29 : 28;
        }
        if (this.shownMonth == 2) {
            lastMonthDay = this.isLeapYear(this.shownYear) ? 29 : 28;
        }
        let fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
        fixNum = fixNum == 0 ? 7 : fixNum;
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 7; y++) {
                let group: eui.Group = this[`date_${x}_${y}`];
                let txt: eui.Label = <eui.Label>group.getChildByName("txt");
                let date = (x * 7 + y + 1) - (fixNum - 1);
                txt.textColor = 0xffffff;
                if (date <= 0) {
                    date = date + lastMonthDay;
                    txt.textColor = 0xaaaaaa;
                } else if (date > currentMonthDay) {
                    date = date - currentMonthDay;
                    txt.textColor = 0xaaaaaa;
                }
                txt.text = date + "";
                let time = this.getTimeByName(`date_${x}_${y}`);
                if (this.selectedDate == time) {
                    this.groupFrame.visible = true;
                    this.groupFrame.x = group.x;
                    this.groupFrame.y = group.y + 115;
                }
                let today = new Date(this.currentYear, this.currentMonth, this.currentDay).getTime();
                if (today == time) {
                    this.bgdToday.visible = true;
                    this.bgdToday.x = group.x;
                    this.bgdToday.y = group.y + 115;
                }
            }
        }
        this.btnCurrentTime.label = this.shownYear + "/" + this.getStrOfLen2(this.shownMonth + 1);
    }

    // -------------------------------------- util --------------------------------------

    /** get timestamp by target.name ( hour=0, min=0, sec=0 )
     * @return {number}
     */
    private getTimeByName(name: string): number {
        let numStr = name.split("_");
        let x: number = +numStr[1];
        let y: number = +numStr[2];
        let num = x * 7 + y + 1;
        let nowTime = new Date(this.shownYear, this.shownMonth, 1).getTime();
        let fixNum = new Date(this.shownYear, this.shownMonth, 1).getDay();
        fixNum = fixNum == 0 ? 7 : fixNum;
        let distance = num - (fixNum - 1);
        return nowTime + 1000 * 60 * 60 * 24 * (distance - 1);
    }

    /** get a string of length 2
     * @param num {number} integer from 0 to 99
     * @return {string} string of length 2
     */
    private getStrOfLen2(num: number): string {
        return ((num | 0) / 100).toFixed(2).slice(2);
    }

    /** whether the input year is a leap year
     * @param year {number} integer
     */
    private isLeapYear(year: number): boolean {
        return !(year % (year % 100 ? 4 : 400));
    }

    // -------------------------------------- dispose --------------------------------------

    public dispose(): void {

    }

}