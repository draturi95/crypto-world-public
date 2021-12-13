import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Loader from './Loader';

const demoImage = '';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    // console.log(cryptoNews, 'news');

    if (!cryptoNews?.value) return <Loader />;

    return (
        <div className='content'>
            <Row gutter={[24, 24]} >
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className='select-news'
                            placeholder='Select a Crypto'
                            ptionFilterProp='children'
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.OptionCoreData.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value='Cryptocurrencies'>All cryptocurrencies</Option>

                            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                        </Select>

                    </Col>

                )}
                {
                    cryptoNews?.value.length == '0' ? <Title level={1} className='no-news' >Sorry, could not find news for this currency.</Title> :
                        cryptoNews?.value.map((news, i) => (
                            <Col xs={24} sm={12} lg={8} key={i}>
                                < Card hoverable className='news-card'>
                                    <a href={news.url} target="_blank" rel="noreferrer">
                                        <div className='news-image-container'>
                                            <Title className='news-title' level={4}> {news.name}</Title>
                                            <img style={{ maxwidth: "200px", maxheight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                        </div>
                                        <p> {news.description.length > 100 ?
                                            `${news.description.substring(0, 100)}...` :
                                            news.description}
                                        </p>
                                        <div className='provider-container'>
                                            <div>
                                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                                <Text className='provider-name'> {news.provider[0]?.name}</Text>
                                            </div>
                                            <Text>{moment(news.datePublished).startOf('ss').fromNow()} </Text>
                                        </div>


                                    </a>

                                </Card>
                            </Col>

                        ))

                }
            </Row ></div>
    )
}

export default News


// cryptoNews?.value.length == '0'