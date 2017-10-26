class Main extends eui.UILayer {

    protected createChildren(): void {
        super.createChildren();
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        //inject the custom material parser
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // initialize the Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /** Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.createScene, this);
    }

    private createScene() {
        mouse.enable(this.stage);
        let calendar = new Calendar();
        calendar.setPosition(50,100,1000);
        this.stage.addChild(calendar);
    }

}
