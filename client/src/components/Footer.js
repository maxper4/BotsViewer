import React, { useState, useEffect } from "react";

import "./Footer.css";

import Loader from "./Loader";

function Footer({apiResponse}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (apiResponse !== "") {
            setLoading(false);
        }
        else {
            setLoading(true);
        }
    }, [apiResponse]);

    return (
        <>
        <div id="left-footer">
        <p>
          <a href="https://github.com/maxper4" target="_blank" rel="noreferrer">GitHub</a> <br />
          <a href="https://twitter.com/maxper__" target="_blank" rel="noreferrer">Twitter</a>
        </p>
        </div>
        <div id="right-footer">
            {
                loading 
                && <Loader /> 
                || 
                <p>
                    {apiResponse}
                </p>
            }
           
        </div>
        </>
    );
}

export default Footer;