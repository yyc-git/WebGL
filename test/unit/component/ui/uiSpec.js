describe("ui", function () {
    var sandbox = null;
    var plainFont;
    var renderer;
    var gameObject;
    var director;

    function createFont() {
        plainFont = wd.PlainFont.create();


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(plainFont);


        renderer = wd.UIRenderer.create();


        gameObject.addComponent(renderer);


        return gameObject;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500
        });

        gameObject = createFont();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        gameObject.dispose();
        sandbox.restore();
    });

    describe("if ui not change, not clear ui canvas and not update ui", function(){
        it("test gameObject only has PlainFont component", function(){
            sandbox.spy(plainFont, "update");
            director.scene.addChild(gameObject);

            director._init();

            sandbox.stub(renderer.context, "clearRect");

            director._loopBody(1);
            director._loopBody(2);

            expect(renderer.context.clearRect).toCalledOnce();
            expect(plainFont.update).toCalledOnce();
        });

        //todo test more ui
    });

    describe("if any ui component dirty, firstly clear canvas once, then update the dirty one", function(){
        function createUIGameObject(font, uiRenderer){
            var renderer;
            var fontComponent;

            var fontGameObject = wd.GameObject.create();
            if(font){
                fontComponent = font;
            }
            else{
                fontComponent = wd.PlainFont.create();
            }

            fontGameObject.addComponent(fontComponent);

            if(uiRenderer){
                renderer = uiRenderer;
            }
            else{
                renderer = wd.UIRenderer.create();
                fontGameObject.addComponent(renderer);
            }


            return {
                gameObject:fontGameObject,
                font:fontComponent,
                renderer:renderer
            }
        }

        it("test ui component with the same UIRenderer", function(){
            var bitmapFont = wd.BitmapFont.create();

            gameObject.addComponent(bitmapFont);

            var data = createUIGameObject(wd.CharFont.create(), {});

            var charFontGameObject = data.gameObject;
            var charFont = data.font;


            gameObject.addChild(charFontGameObject);

            sandbox.spy(bitmapFont, "update");
            sandbox.spy(charFont, "update");





            director.scene.addChild(gameObject);

            director._init();

            sandbox.stub(renderer.context, "clearRect");

            plainFont.dirty = false;
            bitmapFont.dirty = true;
            charFont.dirty = true;



            director._loopBody(1);


            expect(renderer.context.clearRect).toCalledOnce();
            expect(renderer.context.clearRect).toCalledBefore(bitmapFont.update);
            expect(bitmapFont.update).toCalledBefore(charFont.update);

            expect(plainFont.update).not.toCalled();
            expect(bitmapFont.update).toCalledOnce();
            expect(charFont.update).toCalledOnce();
        });
        it("test ui component with different UIRenderers, so that each UIRenderer can clear conce", function(){
            var bitmapFont = wd.BitmapFont.create();

            gameObject.addComponent(bitmapFont);





            var data1 = createUIGameObject();

            var plainFontGameObject2 = data1.gameObject;
            var plainFont2 = data1.font;
            var renderer2 = data1.renderer;



            var bitmapFont2 = wd.BitmapFont.create();

            plainFontGameObject2.addComponent(bitmapFont2);


            gameObject.addChild(plainFontGameObject2);






            sandbox.spy(bitmapFont, "update");
            sandbox.spy(bitmapFont2, "update");
            sandbox.spy(plainFont2, "update");
            //sandbox.stub(renderer2, "clearCanvas");





            director.scene.addChild(gameObject);

            director._init();

            sandbox.stub(renderer.context, "clearRect");
            sandbox.stub(renderer2.context, "clearRect");

            plainFont.dirty = false;
            plainFont2.dirty = false;
            bitmapFont.dirty = true;
            bitmapFont2.dirty = true;



            director._loopBody(1);


            expect(renderer.context.clearRect).toCalledOnce();
            expect(renderer.context.clearRect).toCalledBefore(bitmapFont.update);

            expect(plainFont.update).not.toCalled();
            expect(bitmapFont.update).toCalledOnce();



            expect(renderer2.context.clearRect).toCalledOnce();
            expect(renderer2.context.clearRect).toCalledAfter(bitmapFont.update);
            expect(renderer2.context.clearRect).toCalledBefore(bitmapFont2.update);

            expect(plainFont2.update).not.toCalled();
            expect(bitmapFont2.update).toCalledOnce();
        });
    });
});
