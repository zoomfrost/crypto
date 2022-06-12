import React, {useState} from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../../api/cryptoNewsApi';
import { useGetCryptosQuery } from '../../api/cryptoApi';

import Spinner from '../Spinner';
import { Helmet } from 'react-helmet';

const {Text, Title} = Typography;
const {Option} = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


const News = ({simplified}) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12});
    const {data} = useGetCryptosQuery(100);


    if(!cryptoNews?.value) return <Spinner />;
  return (
    <>
        <Helmet>
            <meta
                name="description"
                content="news"
                />
            <title>Cryptoverse</title>
        </Helmet>
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency'>
                            Cryptocurrency
                        </Option>
                        {data?.data?.coins.map((coin, i) => <Option key={i} value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className="news-image-container">
                                <Title level={4} className='news-title'>
                                    {news.name}
                                </Title>
                                <img style={{maxHeight: 100, maxWidth: 200}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news thumbnail' />
                            </div>
                            <p>
                                {news.description > 100 ?
                                    `${news.description.substring(0, 100)}...` : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar 
                                        src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                                        alt="ptovider avatar"
                                    />
                                    <Text className='provider-name'>
                                        {news.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                            
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default News;