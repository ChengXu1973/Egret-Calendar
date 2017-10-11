class Calendar extends eui.Component {

    public constructor() {
        super();
        this.skinName = "/resource/game-skin/CalendarSkin.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    private static instance: Calendar;

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

    /** set the position & size of the calendar
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

    }

    // -------------------------------------- skin Component --------------------------------------

    // -------------------------------------- variables --------------------------------------

    // -------------------------------------- properties --------------------------------------

    // -------------------------------------- event listener --------------------------------------

    // -------------------------------------- handle ui --------------------------------------

    // -------------------------------------- dispos --------------------------------------


}