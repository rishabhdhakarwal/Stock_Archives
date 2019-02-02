import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Link, withRouter } from "react-router-dom";
import StocksList from "./StocksList";
import lineChart from "./charts";
import { Chart } from "react-charts";
import "./App.css";
import { Button } from "react-bootstrap";
import top_50 from "./top_50";
import {
  Nav,
  Navbar,
  NavItem,
  NavForm,
  Form,
  FormControl
} from "react-bootstrap";
import StocksService from "./StocksService";
import StocksHistory from "./stock_history";
import "w3-css/w3.css";
import Charts from "./charts";
const stocksService = new StocksService();

class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateInput = React.createRef();
    this.serachInput = React.createRef();
  }

  handleSubmit(e) {
    let self = this;
    e.preventDefault();

    stocksService
      .getStockHistory(
        this.serachInput.current.value,
        this.dateInput.current.value
      )
      .then(function(result) {
        console.log(result.data);
        self.props.history.push(
          `/history/${self.serachInput.current.value}/${
            self.dateInput.current.value
          }`
        );
        self.setState({
          stockData: result.data
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar bg="dark"  variant="dark" fixed="top">
          <Nav className="mr-auto">
            <Nav.Link>
              {" "}
              <Link to="/">Top 50</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/all">All Stocks</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/charts">Charts</Link>
            </Nav.Link>
          </Nav>
          <Form inline onSubmit={this.handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search by Stock Symbol"
              className="mr-sm-2"
              ref={this.serachInput}
            />
            <FormControl
              type="text"
              placeholder="YYYY-MM-DD"
              className="mr-sm-2"
              ref={this.dateInput}
            />
            <Button variant="outline-info" onClick={this.handleSubmit}>
              Search
            </Button>
          </Form>
        </Navbar> 

        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <a className="navbar-brand" href="#">
              Easter Egg
            </a>
          </nav>
        </div>

        <div className="container-fluid" >
          <nav className="navbar navbar-expand-lg navbar-light bg-light" position="fixed"  >
          <div className="w3-center">
            <h4>
              Stocks
            </h4>
            </div>
          </nav>

          <div className="content">
            <Route path="/" exact component={top_50} />
            <Route path="/all" exact component={StocksList} />
            <Route
              path="/history"
              render={props => (
                <StocksHistory {...props} stockList={this.state.stockData} />
              )}
            />
            <div className="w3-padding w3-display-middle">
              <Route path="/charts" exact component={Charts} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Layout = withRouter(BaseLayout);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
