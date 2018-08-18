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

module.exports = {
    ul: function (content) {
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