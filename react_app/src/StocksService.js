import axios from 'axios';
const API_URL = 'http://localhost:8000';


export default class StocksService{

    constructor(){}


    getStocks() {
        const url = `${API_URL}/api/users/`;
        return axios.get(url).then(response => response.data);
    }  
    getStocksByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getTop50() {
    	const url = `${API_URL}/top_50`;
        return axios.get(url).then(response => response.data);
	}
	getStockHistory(query,query1) {
    	const url = `${API_URL}/stock_history?query=${query}&query1=${query1}`;
        return axios.get(url).then(response => response.data);
	}
	


}