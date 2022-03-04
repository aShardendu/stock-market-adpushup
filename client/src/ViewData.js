import React , {useState,useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Header.css';
import { useNavigate } from 'react-router-dom';

function ViewData() {
    const[recentData, setRecentData] = useState([]);
    // const[del, setDel] = useState('');
    var table ;
    const navigate = useNavigate();
    const rowdel = (event) =>{
        table = document.getElementById('table');
        console.log(table);
        console.log(table.rows);
        console.log(event.target.id);
        console.log(typeof( event.target.id));
        let rNum = parseInt(event.target.id);
        console.log(typeof( rNum));
        table.deleteRow(rNum + 1);
        console.log(recentData);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(recentData[event.target.id])
        };
         fetch('http://localhost:5000/view', requestOptions)
            .then(()=>console.log("delete successfull"))
            .then(() => alert('Delete successful'));
    }
   
    const delBtn = (cell, row, rowIndex, formatExtraData) =>{
        return(
            <input className='bck' type="button" value="Delete" id={rowIndex} onClick={rowdel} />
        )
    }

    const columns = [
        {dataField:'COMPANY_NAME', text: 'Company Name', headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}},
        {dataField:'SYMBOL', text: 'Symbol', headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}},
        {dataField: "Button", text: '', formatter: delBtn  ,headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'} },
        {dataField:'CURRENCY', text: 'Currency',headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}},
        {dataField:'PRICE', text: 'Matchscore',headerStyle: { backgroundColor: '#F4F2FF', color: '#6E6893'}}
    ]
    useEffect(() =>{
        fetch('http://localhost:5000/view')
        .then(response => response.json())
        .then(result => setRecentData(result))
        .catch(error => console.log(error));
    },[]);
    return (
        <div  className='tbl'>
            <div className='svd_data'>
                Saved Data Table
            </div>
            <BootstrapTable 
                id='table'
                bootstrap4
                keyField='COMPANY_NAME'
                columns={columns}
                data={recentData?recentData:''}
                hover
                bordered={false}
            />
            <div className='svd_ftr'>
            <input className='bck' type="button" value="Back" onClick={()=>{
                navigate('/');
            }} />
            </div>
        </div>
    )
}

export default ViewData