import React from "react";
import "./ContactRetailer.scss"
import Button from "../../../components/UI/Button/Button";

const contactRetailer = ({retailerEmail}) => (
    <>
        <a href={"mailto:"+retailerEmail+"?subject=Order from your great bio products"}>
            <Button clicked="">Buy</Button>
        </a>
    </>
);

export default contactRetailer;