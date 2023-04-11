class Component {
    constructor() {
        this.state = {};
        this.props = {};
        this.element = document.createElement('div');
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.update();
    }

    /**
     *
     * @param props
     * @returns {HTMLElement}
     */
    render(props = {}) {
        this.props = {...props};
        const div = this.element;
        div.onclick = props.onClick;
        if (props.style) {
            div.style = props.style;
        }
        div.innerHTML = '';
        div.append(...props.children)
        return div;
    }

    update() {
        this.render(this.props);
    }
}
