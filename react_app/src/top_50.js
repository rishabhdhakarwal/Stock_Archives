import  React, { Component } from  'react';

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




