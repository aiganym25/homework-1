class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement('button');
        this.element.style.cssText = 'color: red;';
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            onClick: props.onClick,
            children: props.text,
            style: this.state.style
        });
    }
}

class List extends Component {
    constructor() {
        super();
        this.element = document.createElement('ul');
    }

    /**
     * @override
     * @param props
     * @param props.items {string[]}
     * @param props.addItem {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [...props.items.map(item => {
                return new ListItem().render({children: item});
            }),
                new Button().render({
                    text: 'Add item',
                    onClick: props.addItem,
                })
            ]
        });
    }
}

class ListItem extends Component {
    render(props) {
        return super.render({
            children: props.children
        });
    }
}