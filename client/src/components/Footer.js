import "./Footer.css";

function Footer({apiResponse}) {
    return (
        <>
        <div id="left-footer">
        <p>
          <a href="https://github.com/maxper4" target="_blank" rel="noreferrer">GitHub</a> <br />
          <a href="https://twitter.com/maxper__" target="_blank" rel="noreferrer">Twitter</a>
        </p>
        </div>
        <div id="right-footer">
            <p>
            {apiResponse}
            </p>
        </div>
        </>
    );
}

export default Footer;