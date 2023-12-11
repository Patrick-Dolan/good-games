import { Link } from "react-router-dom"

function RouteNotFoundPage() {
  return (
    <div className="container text-center">
      <h1 class="text-center">404 Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      {/* TODO add a fun little image of something broken here */}
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default RouteNotFoundPage