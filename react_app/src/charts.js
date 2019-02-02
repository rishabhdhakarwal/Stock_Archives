import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import top_50 from "./top_50";
import Component from "react-component-component";
import axios from "axios";
const API_URL = "http://localhost:8000";

let Charts = _ => (
  <Component
    initialState={{ dataLoadingStatus: "loading", chartData: [] }}
    didMount={async function(component) {
      const response = await fetch("http://localhost:8000/top_10?format=json");
      const json = await response.json();

      const data = json.data;
      console.log(data);
      // const [metadata, data] = json;
      const columns = [
        { type: "string", label: "Symbol" },
        { type: "number", label: "Volume" }
      ];
      let rows = [];
      const nonNullData = data.filter(row => row.symbol !== null);

      for (let row of nonNullData) {
        let symbol = row.symbol;
        let volume = row.volume;
        rows.push([symbol, volume]);
      }
      component.setState({
        chartData: [columns, ...rows],
        dataLoadingStatus: "ready"
      });
    }}
  >
    {component => {
      return component.state.dataLoadingStatus === "ready" ? (
        <Chart
          chartType="LineChart"
          width={"900px"}
          height={"700px"}
          data={component.state.chartData}
          options={{
            hAxis: {
              format: "yyyy",
              
            },
            vAxis: {
              format: "",
              
            },
            legend: { position: "none" },
            title: "Top 10 Stocks by Volume of all time"
          }}
          rootProps={{ "data-testid": "2" }}
          
        />
      ) : (
        <div>Fetching data from API</div>
      );
    }}
  </Component>
);

export default Charts;

/*import  React, { Component } from  'react';

import  StocksService  from  './StocksService';

const  stocksService  =  new  StocksService();


class  StocksList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            stocks: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        stocksService.getTop50().then(function (result) {
            self.setState({ stocks:  result.data, nextPageURL:  result.nextlink})
        });
    }

    nextPage(){
        var  self  =  this;
        stocksService.getStocksByURL(this.state.nextPageURL).then((result) => {
            self.setState({ stocks:  result.data, nextPageURL:  result.nextlink})
        });
    }


    render() {

    return (
        <div  className="customers--list">
            <table  className="table" class="w3-table w3-striped w3-border w3-centered w3-hoverable w3-card-4 ">
            <thead  key="thead">
            <tr>
                
                <th>Date</th>
                <th>Symbol</th>
                <th>Open</th>
                <th>Close</th>
                <th>Low</th>
                <th>High</th>
                <th>Volume</th>
            </tr>
            </thead>
            <tbody>
            {this.state.stocks.map( c  =>
            <tr  key={c.id}>
                <td>{c.date}</td>
                <td>{c.symbol}</td>
                <td>{c.open1}</td>
                <td>{c.close}</td>
                <td>{c.low}</td>
                <td>{c.high}</td>
                <td>{c.volume}  </td>
            </tr>)}
            </tbody>
            </table>
            
            
 
        </div>
        );
  }
}
export  default  StocksList;
*/
