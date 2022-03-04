import React , {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Searchbar from './components/Searchbar';
import './components/Header.css';
import ViewData from './ViewData';
import {useNavigate} from 'react-router-dom';

function DataList() {
    const[userList, setUserList] = useState([]);
    const[key , setKey] = useState('');
    const[route,setRoute] = useState(false);
    var hit = null;
    console.log(key);
    const navigate = useNavigate();

    const address = () =>{
        if(hit === true){
            console.log("address")
            setRoute(true);
            navigate('/view');
        }
    }

    const postData = (id) =>{
        if(hit!==true){
        console.log("hii");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userList[id])
        };
        console.log(requestOptions);
        fetch('http://localhost:5000/view', requestOptions)
        .then(response => {response.json()
        console.log(response)});
        }
    }
    const handleSubmit = (e, id) =>{
        console.log(hit);
        let btn = document.getElementById(id).value;
        // let css = document.getElementById(id).className;
        if(btn === "SaveData"){
        e.target.value = "View";
        e.target.className="bck"
        }
        else
        // setHit(true);
        hit = true;
        address();
        postData(id);
    }
    const dispBtn = (cell, row, rowIndex, formatExtraData) =>{
        return(
            <input className="save" type="button" value="SaveData" id={rowIndex} onClick={(event) => {handleSubmit(event,rowIndex)}} />
        )
    }
    const columns = [
        {dataField:'2. name', text: 'Company Name', headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}, style:{FontSize:'14px', FontWeight:'500'}},
        {dataField:'1. symbol', text: 'Symbol', headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}},
        {dataField: "Button", text: '', formatter: dispBtn  ,headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'} },
        {dataField:'8. currency', text: 'Currency',headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}},
        {dataField:'9. matchScore', text: 'Matchscore',headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}}
    ]
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage){
            console.log('page',page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage){
            console.log('page',page);
            console.log('sizePerPage', sizePerPage);
        }
    });

    useEffect(() => {
       
        let url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=RELIANCE&apikey=0YTBJB4M0LEPGWA2';

        if(key){
             url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+key+'&apikey=0YTBJB4M0LEPGWA2'
        }
        console.log(url);
      fetch(url)
      .then(response => response.json())
      .then(result => setUserList(result['bestMatches']))
      .catch(error => console.log(error));
    },[key])
    console.log(userList);
    return (
        <div className='tbl'>
            {
                route === true? <ViewData />
                :
                <div>
                <Searchbar 
                setKey = {setKey}
                />
                <BootstrapTable bootstrap4 keyField='2. name' columns={columns} data={userList?userList:''} pagination={pagination} hover   bordered={false} />
                </div>
            }
            
            
        </div>
    )
}

export default DataList
