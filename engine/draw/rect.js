window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "rect",
        property: [
            {key: 'width', value: 0},
            {key: 'height', value: 0},
            {key: 'lineColor', value: '#fff'},
            {key: 'lineWidth', value: 0},
            {key: 'fillColor', value: '#000'},
            {key: 'drawCall', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];

    this.registerSystem.push({
        name: "rect",
        priority: 5,
        systemComponent: ["rect"],
        onInit: function () {
            //var tCanvas = engine.getCanvas();
            //var tContext = tCanvas.getContext("2d");
            //engine.getManager().getSystem("render").addRenderListener({
            //    object: this,
            //    callback: function (aRenderProperty) {
            //        var tComponent = _allComponent[aRenderProperty.entityId];
            //        if (tComponent) {
            //            var tProperty = tComponent.getProperty();
            //            tContext.save();
            //            tContext.translate(aRenderProperty.x, aRenderProperty.y);
            //            tContext.scale(aRenderProperty.scaleX, aRenderProperty.scaleY);
            //            tContext.fillStyle = tProperty.fillColor;
            //            tContext.fillRect(-tProperty.width * tProperty.anchorPointX, -tProperty.height * tProperty.anchorPointY, tProperty.width, tProperty.height);
            //            tContext.restore();
            //        }
            //    }
            //})
        },
        //onAdd: function (args) {
        //    //组件加入时触发
        //},
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        onUpdate: function (aComponent) {

            aComponent.property.drawCall = function (aCanvas) {
                var context = aCanvas.getContext("2d");
                var comRender = aComponent.entity.components.render;
                context.save();
                var comNode = aComponent.entity.components.node;
                var dx = comNode.property.width * comNode.property.anchorPointX;
                var dy = comNode.property.height * comNode.property.anchorPointY;
                context.translate(comRender.property.x * engine.dpr, comRender.property.y * engine.dpr);
                context.scale(comRender.property.scaleX * engine.dpr, comRender.property.scaleX * engine.dpr);
                context.rotate(Math.PI / 180 * comRender.property.rotation);
                context.globalAlpha = comRender.property.alpha;

                //console.log("rect",aComponent.property.fillColor)
                context.fillStyle = aComponent.property.fillColor;
                context.fillRect(-dx, -dy, aComponent.property.width, aComponent.property.height);
                if (aComponent.property.lineWidth != 0) {
                    context.lineWidth = aComponent.property.lineWidth;
                    context.strokeStyle = aComponent.property.lineColor;
                    context.strokeRect(0, 0, aComponent.property.width, aComponent.property.height);
                }

                context.restore();
            }

            //组件改变时触发
            //var tComponent = args.component;
            //var tProperty = tComponent.property;
            //
            //var tCanvas = document.createElement('canvas');
            //var tContext = tCanvas.getContext("2d");
            //tCanvas.width = tProperty.width;
            //tCanvas.height = tProperty.height;
            //
            //tContext.fillStyle = tProperty.fillColor;
            //tContext.fillRect(0, 0, tProperty.width, tProperty.height);
            //if (tProperty.lineWidth != 0) {
            //    tContext.lineWidth = tProperty.lineWidth;
            //    tContext.strokeStyle = tProperty.lineColor;
            //    tContext.strokeRect(0, 0, tProperty.width, tProperty.height);
            //}
            //tProperty.draw = tCanvas;
        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {
                //for (var i in this.updatedComponents) {
                //    var tEntity = engine.manager.getEntityById(i);
                //    var tComponent = this.components[i];
                //    if (tComponent) {
                //        var tProperty = tComponent.property;
                //        var tRender = tEntity.getComponent("render");
                //        var tRenderProperty = tRender.property;
                //        tRenderProperty.draw = tProperty.draw;
                //        tRender.update();
                //    }
                //}
                for (var i in this.updatedComponents) {
                    this.updatedComponents[i].entity.components.render.property.drawCall = this.updatedComponents[i].property.drawCall;
                }
            }
        }
    });
}).call(engine);