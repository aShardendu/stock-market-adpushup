import React, { useState } from 'react'
import SearchIcon from "@material-ui/icons/Search";
import './Header.css';
const Searchbar = (props) => {
    const [searchData, setSearchData] = useState([]);
    const [searchval, setSearchval] = useState('');
    const search = (word) => {
        console.warn(word)
        setSearchval(word);
        fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + word + '&apikey=0YTBJB4M0LEPGWA2').then(response => response.json())
            .then(result => setSearchData(result['bestMatches']))
            .catch(error => console.log(error));
        console.log(searchData);
    }
    const submitSearch = () => {
        props.setKey(searchval);
        setSearchData([]);
    }
    return (
        <div className='mh70' >
            <div className='h_txt'>Stock Details Table</div>
            <div className='srch'>
                <div>
            <input className='srch_bar' type="text" placeholder='  Search by Company Name' onChange={(event) => search(event.target.value)} />
            <button className='srch_btn' onClick={submitSearch}><SearchIcon /></button>
            </div>
            {
                searchData && searchData.length > 0 ?
                    <div className='srch_lst'>
                        {
                            searchData.map(item =>
                                <div className='srch_itm'>
                                    {item["2. name"]}
                                </div>
                            )
                        }
                    </div>
                    : ''
            }
            </div>
           
        </div>

    )
}

export default Searchbar;