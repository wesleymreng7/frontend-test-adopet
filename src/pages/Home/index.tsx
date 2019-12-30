import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { usePetApi } from '../../api';
import { Table, Button } from 'antd';
import { columnsTable, commonFields } from './config';
const { columns } = columnsTable();



const Home: React.FunctionComponent = () => {
    const [forceRedirect, setForceRedirect] = useState(false);
    const [dataPagination, setDataPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 10
    });
    const [dataController, setDataController] = useState([]);
    const [dataInputFilter, setDataInputFilter] = useState({});
    const [dataInputSort, setDataInputSort] = useState()
    const { dataPet, petSearch } = usePetApi();
    const getData = async (page: number, filter?: any, sort?: any) => {
        await petSearch({
            search: {
                ...filter,
                ...commonFields
            },
            options: {
                page: page,
                limit: dataPagination.pageSize,
                sort: (sort) ? [sort] : []
            }
        });
    };
    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        setDataPagination(pager);
        
        const activeSort = handleSort(sorter);
        const myFilters = handleFilters(filters);
        getData(pagination.current, myFilters, activeSort);

    };
    const handleFilters = (filters: any) => {
        var activeFilters = {};
        if (Object.keys(filters).length > 0) {
            setDataInputFilter({});
            Object.keys(filters).forEach((key) => {
                if(filters[key][0]) {
                    activeFilters = {
                        [key]: filters[key][0]
                    };
                }
                console.log(activeFilters);
            })
            setDataInputFilter(activeFilters);
        }
        return activeFilters;
    }
    const handleSort = (sorter: any) => {
        var activeSort;
        if(Object.keys(sorter).length > 0) {
            setDataInputSort('');
            activeSort = (sorter.order !== 'ascend') ? '-' : '';
            activeSort += sorter.columnKey;
            setDataInputSort(activeSort);
        }
        return activeSort;
    }
    const logout = () => {
        localStorage.removeItem('requestToken');
        localStorage.removeItem('registerToken');
        window.location.reload();
    }
    useEffect(() => {
        const requestToken = localStorage.getItem('registerToken');
        if (!requestToken) {
            setForceRedirect(true);
        }
        if (dataController.length === 0 && !dataPet.loading) {
            getData(dataPagination.current, dataInputFilter, dataInputSort);
            console.log('get init data')
        }
        if (dataPet.data.data && !dataPet.loading) {
            setDataPagination({
                ...dataPagination,
                total: dataPet.data.data.count
            })
            setDataController(dataPet.data.data.result)
        }
    }, [forceRedirect, dataPet, dataPagination.current]);
    if (forceRedirect) {
        return <Redirect to="/login" />;
    }
    return (
        <div style={{ padding: '20px'}}>
            <Button type="primary" onClick={logout} style={{ marginTop: '20px', marginBottom:'10px'}}>Logout</Button>
            {<Table
                columns={columns}
                rowKey={(record: any) => record.id}
                dataSource={dataController}
                pagination={dataPagination}
                loading={dataPet.loading}
                onChange={handleTableChange}
            />}
        </div>
    );
}

export default Home;