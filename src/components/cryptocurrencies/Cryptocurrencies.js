import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';


import { useGetCryptosQuery } from '../../api/cryptoApi';
import { cryptoListChanged, cryptoSearchTermChanged } from '../../slices/cryptoSlice';

import Spinner from '../Spinner';
import { Helmet } from 'react-helmet';

const Cryptocurrencies = ({simplified}) => {

    const dispatch = useDispatch();
    const crypto = useSelector((state) => state.crypto.crypto);
    const searchTerm = useSelector((state) => state.crypto.searchTerm);

    

    const count = simplified ? 8 : 100;
    const {data: cryptoList, isFetching} = useGetCryptosQuery(count);

    useEffect(() => {
        

        const func = async () => {
            const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
            
            await dispatch(cryptoListChanged(filteredData)
            // 
            )
        }

        func()
    }, [cryptoList, searchTerm]);


    

    if(isFetching) return <Spinner />;



    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="currencies"
                    />
                <title>Cryptoverse</title>
            </Helmet>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder='Search CryptoCurrency' onChange={(e) => dispatch(cryptoSearchTermChanged(e.target.value))} />
                </div>
            )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {crypto?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link to={`/cryptocurrencies/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank} ${currency.name}`}
                                extra={<img alt={currency.name} className='crypto-image' src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            
        </>
    )
}

export default Cryptocurrencies