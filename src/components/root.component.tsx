import * as React from "react";
import * as ReactDOM from "react-dom";
import {Products} from "./products.component";
import {NavBar} from "./navBar.component";

export interface RootProps {

}

export class Root extends React.Component<RootProps, {}> {
    static products : Array<any>;

    constructor(props: RootProps) {
        super(props);
    }

    // when component mounted
    componentDidMount() {
        this.renderNavBar();
        this.getProducts(this.renderProducts); // callback: renderProduct
    }

    getProducts = (callback : any) => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", (ev: any) => {
            if (ev.target.status == 200) {
                Root.products = JSON.parse(ev.target.response);

                if (callback)
                    callback();
            }
        });
        xhr.open("GET", window.location.origin + "/products.json");
        xhr.send();
    };

    renderProducts = () => {
        console.log(Root.products);

        ReactDOM.render(
            <Products products={Root.products} />,
            document.querySelector(".main")
        );
    };

    renderNavBar = () => {
        ReactDOM.render(
            <NavBar root={this}/>,
            document.querySelector(".nav")
        );
    };

    render() {
        return <div>
            <div className="nav"></div>
            <div className="main container"></div>
        </div>
    }
}

let init = () => {
    ReactDOM.render(
        <Root />,
        document.querySelector(".root")
    );
};

init();