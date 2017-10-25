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

    /** frame style of current date */
    private groupFrame: eui.Group;

    // -------------------------------------- variables --------------------------------------

    // -------------------------------------- properties --------------------------------------

    // -------------------------------------- event listener --------------------------------------

    private initListener(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        // this.addEventListener(MouseEvent. , this.handleTap, this);
    }

    private handleTap(evt: egret.TouchEvent): void {
        switch (evt.target) {
            case this.btnCurrentTime:
                break;
            case this.btnNext:
                break;
            case this.btnPrevious:
                break;
            default:
                if (evt.target.name && (<string>evt.target.name).indexOf("date_") > -1) {
                    console.log("tap", evt.target.name);
                    this.groupFrame.visible = true;
                    this.groupFrame.x = evt.target.x;
                    this.groupFrame.y = evt.target.y + 115;
                }
                break;
        }
    }

    // -------------------------------------- handle ui --------------------------------------


    // -------------------------------------- util --------------------------------------

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