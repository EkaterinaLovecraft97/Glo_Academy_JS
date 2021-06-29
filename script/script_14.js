'use strinct';
//1)
function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.newElem = function () {
  let elem;
  if (this.selector[0] === '.') {
    elem = document.createElement('div');
    elem.className = this.selector.slice(1);
  }
  if (this.selector[0] === '#') {
    elem = document.createElement('p');
    elem.id = this.selector.slice(1);
    // elem.textContent = 'Тестовая запись';
  }
  elem.style.cssText = `height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;`;
  // console.log(elem);
  return elem;
};

let elDiv = new DomElement('.block', 100, 250, 'magenta', 12);
let elParagraph = new DomElement('#best', 100, 400, 'pink', 12);

document.body.appendChild(elDiv.newElem());
document.body.appendChild(elParagraph.newElem());