import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Root} from "./root.component";

// Products properties
export interface ProductsProps {
    products: Array<any>
}

export class Products extends React.Component<ProductsProps, {}> {

    static DISCOUNT = 0.75;

    // get Thumbnail element
    getThumbnail = (product: any) => {
        let variant = product.variants[0];
        return <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
                <img src={product.image.src} />
                <div className="caption">
                    <h3 className="title">{product.title}<br/>
                        <span className="compare_at_price">${variant.price}  </span>
                        <span  className="price"> ${variant.price * Products.DISCOUNT} Sale</span>
                    </h3>
                    <p>{product.body_html}</p>
                    <p><a href="#" className="btn btn-primary btn-block" role="button"
                          onClick={() => this.onClickBuyButton(product)}>BUY</a>
                    </p>
                </div>
            </div>
        </div>
    };

    onClickBuyButton = (product: any) => {

        let post_data = JSON.stringify({
            variantId: product.variants[0].id,
            qty: 1,
            price: product.variants[0].price,
            percentage: 100 - 100 * Products.DISCOUNT
        });

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", (res: any) => {
            if (res.target.status == 200) {
                console.log(JSON.parse(res.target.response));
            }
        });
        xhr.open("POST", window.location.origin + "/draft_orders.json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(post_data);
    };

    render() {

        let thumbnails = Array<any>();

        this.props.products.forEach((product: any) => {
            thumbnails.push(this.getThumbnail(product));
        });

        return <div className="row">
                {thumbnails}
        </div>
    }

}