const hints = require('../models/hints.js');

class Hint {
    constructor() {
        this.render()
    }

    render() {
        const elements = this.createElements();
        this.setClasses(elements);
        this.setText(elements);
        this.appendToPage(elements);
    }

    createElements() {
        return {
            row: document.createElement('div'),
            column: document.createElement('div'),
            card: document.createElement('div'),
            span: document.createElement('div'),
            text: document.createElement('p')
        }
    }

    setClasses(elements) {
        elements.row.setAttribute('class', 'row');
        elements.column.setAttribute('class', 'col s12 m8 offset-m3');
        elements.card.setAttribute('class', 'card-panel red darken-4 center-align');
        elements.span.setAttribute('class', 'white-text');
        elements.text.setAttribute('id', 'hint');
    }

    setText(elements) {
        const title = document.createElement('b');
        title.innerText = 'Hint: ';

        const hint = document.createElement('text');
        hint.innerText = this.getHintText();

        elements.text.appendChild(title);
        elements.text.appendChild(hint);
    }

    getHintText() {
        const random = Math.floor(Math.random() * hints.length);
        const hintText = hints[random];
        return hintText;
    }

    appendToPage(elements) {
        elements.span.appendChild(elements.text);
        elements.card.appendChild(elements.span);
        elements.column.appendChild(elements.card);
        elements.row.appendChild(elements.column);
        document.body.appendChild(elements.row);
    }
}

module.exports = Hint;
