import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Table, Badge, Dropdown, Space } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return <Loader />;

    const columns = [
        { title: 'Index', dataIndex: 'index', key: 'index' },
        { title: 'Exchanges', dataIndex: 'exchanges', key: 'exchanges' },
        { title: '24h Trade Volume', dataIndex: 'HTradeVolume', key: 'HTradeVolume' },
        { title: 'Markets', dataIndex: 'markets', key: 'markets' },
        { title: 'Change', dataIndex: 'change', key: 'change' },
    ];

    const dataMain = exchangesList.map((exchange) => {
        return (
            {
                key: exchange.id,
                index: exchange.rank,
                exchanges: [<Avatar className="exchange-image" src={exchange.iconUrl} />, exchange.name],
                HTradeVolume: millify(exchange.volume),
                markets: exchange.numberOfMarkets,
                change: millify(exchange.marketShare),
                description: HTMLReactParser(exchange.description || 'Sorry, no data obtained from API'),
            }
        )
    })

    return (
        <>
            <Text> <em>*Expand the exchanges for more details.</em></Text>
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: "20px" }}>{record.description}</p>,
                }}
                dataSource={dataMain}
            />
        </>
    );
};

export default Exchanges;
