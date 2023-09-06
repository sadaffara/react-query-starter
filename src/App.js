import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Movies from "./components/Movies";
import Home from "./components/Home";
import MoviesRQ from "./components/MoviesRQ";
import DependentQueries from "./components/DependentQueris";
import PaginatedMovies from "./components/PaginatedMovies";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Link to="/rq-movies">Movies RQ</Link>
              </li>
              <li>
                <Link to="/rq-paginated-movies">Paginated Movies RQ</Link>
              </li>
            </ul>
          </nav>
          <div className="page-container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/movies">
                <Movies />
              </Route>
              <Route exact path="/rq-movies">
                <MoviesRQ />
              </Route>
              <Route exact path="/rq-paginated-movies">
                <PaginatedMovies />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
