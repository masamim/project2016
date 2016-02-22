//creates a text box at the given position
//this is just the background that text will be displayed on
function createTextboxBackground(x, y, width, height, centerToPoint) {
    
    var lineThickness = 3;
    
    //textbox positioning is affected by line thickness
    //the left, boddom, and right edges are misaligned
    var posX = x + lineThickness / 2;
    var posY = y;
    
    width -= lineThickness;
    height -= lineThickness;
    
    if(centerToPoint) {
        
        posX -= width / 2;
        posY -= height / 2;
    }
    
    var box = game.add.graphics(posX, posY);
    
    //first create the colored rectangle
    var fillColor = 0x000099;
    box.beginFill(fillColor, 0.7);
    
    //now create a border around it to make it look nice
    var lineColor = 0x888888;
    var boxRadius = lineThickness * 4;
    
    box.lineStyle(lineThickness, lineColor, 0.8);
    box.moveTo(boxRadius, 0);
    box.lineTo(width - boxRadius, 0);
    box.quadraticCurveTo(width, 0, width, boxRadius);
    box.lineTo(width, height - boxRadius);
    box.quadraticCurveTo(width, height, width - boxRadius, height);
    box.lineTo(boxRadius, height);
    box.quadraticCurveTo(0, height, 0, height - boxRadius);
    box.lineTo(0, boxRadius);
    box.quadraticCurveTo(0, 0, boxRadius, 0);
    box.endFill();
    
    return box;
};

//object that draws a text box onto the screen, and allows you to set the text that is displayed
//if centerToPoint is true, then x, y represents the center point of the textbox
function textBox(x, y, width, height, centerToPoint) {
    
    //text box background
    this.background = createTextboxBackground(x, y, width, height, centerToPoint);
    this.background.fixedToCamera = true;
    
    //text to display
    this.text = game.add.text(0, 0, "");
    this.background.addChild(this.text);
    
    this.text.fontSize = 22;
    this.text.x = this.background.width / 2;
    this.text.y = this.background.height / 2;
    this.text.anchor.x = 0.5;
    this.text.anchor.y = 0.5;
    this.text.fill = 'white';
};

textBox.prototype.setText = function(newText) {
    
    this.text.text = newText;
};

textBox.prototype.show = function() {
    
    this.background.visible = true;
};

textBox.prototype.hide = function() {
    
    this.background.visible = false;
};