class HtmlContent {
    constructor(...content) {
        this.content = content;
    }

    toHtml() {
        return this.content.reduce((res, curr) => res + curr/*curr.toHtml()*/, '');
    }
}

class HtmlElement {
    constructor(name, attributes, ...content) {
        this.name = name;
        this.attributes = attributes;
        this.content = new HtmlContent(content);
    }

    toHtml() {
        let startTag = `<${this.name}${buildAttributesHtml(this.attributes)}>`;

        return startTag + this.content.toHtml() + `</${this.name}>`;
    }
}

function buildAttributesHtml(attributes) {
    var res = '';

    for (var prop in attributes)
        res += ` ${prop}='${attributes[prop]}'`;

    return res;
}

function createElement(name, attributes, content) {
    return new HtmlElement(name, attributes, content);
}
//V1.0
/*function ul(attributes, content) {
    var arg = {};
    if (attributes && content || typeof attributes === 'object')
        arg = attributes;
    else
        if (typeof attributes !== 'object')
            content = attributes;

    return createElement('ul', arg, content).toHtml();
}*/

//V1.1
function ul(attributes, content) {
    if (typeof attributes !== 'object') {
        content = attributes;
        attributes = null // TODO: should this be {}????
    }

    return createElement('ul', attributes, content).toHtml();
}

console.log(ul({class: 'nav'}, "oi"))
console.log(ul("oi"))
console.log(ul({class: 'nav'}))
console.log(ul({}))
console.log(ul(1)) //TODO: should this work??? Or we only accept strings!?

module.exports = {
    ul: function (attributes = {}, content) {
        let toHtml = createElement('ul', {}, content).toHtml();
        console.log(toHtml);
        return toHtml;
    },
    li: function (attributes, content) {
        let toHtml = createElement('li', attributes, content).toHtml();
        console.log(toHtml);
        return toHtml;
    }
};