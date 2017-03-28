import * as React from "react";
import * as ReactDOM from "react-dom";
import {Root} from "./root.component";

export interface NavBarProps {
    root: Root
}

export class NavBar extends React.Component<NavBarProps, {}> {

    goHome = () => {
        this.props.root.renderProducts();
    };

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header">
                            <a className="navbar-brand" onClick={this.goHome}>STORE</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}