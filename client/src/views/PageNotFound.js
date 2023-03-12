import "./PageNotFound.css"

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => window.location.href = "/"}>Go to Home</button>
    </div>
  );
}

export default PageNotFound;