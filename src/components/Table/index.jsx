import React, { useState, useMemo, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import './index.scss';

export default function Table(props) {
    const { dataSource = [], columns = [], total = 0, pageSize = 100, onTableHeaderClick, ...otherProps } = props;
    const [current, setCurrent] = useState(1);
    let num = 1;

    const widthSum = useMemo(() => {
        return columns.reduce((a, b) => a?.width || a + b?.width || b, 0);
    }, [columns]);
    const currentData = useMemo(() => {
        let total2Show = current * pageSize;
        return dataSource.slice(0, total2Show);
    }, [pageSize, current, dataSource.length]);

    const handleScroll = useCallback();
    // _.debounce((e) => {
    //     const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } = e.target;
    //     if (scrollTop === scrollHeight - clientHeight) {
    //         num++;
    //         setCurrent(num);
    //     }
    // }, 500),
    // []
    return (
        <div className="table-wrapper" onScrollCapture={handleScroll} {...otherProps}>
            {dataSource.length ? (
                <table
                    className="table log-table"
                    style={{
                        borderSpacing: 0
                    }}
                >
                    <thead className="log-thead" onClick={onTableHeaderClick}>
                        <tr className="log-tr">
                            {columns.map(({ title, key, align = 'center', width = 100 }) => {
                                return (
                                    <th
                                        key={key}
                                        align={align}
                                        className="tableHeader log-th"
                                        width={`${(width / widthSum).toFixed(2) * 100}%`}
                                    >
                                        {title}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="log-body">
                        {currentData.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <TableRow columns={columns} record={item} idx={index} />
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                NoData()
            )}
        </div>
    );
}

function TableRow(props) {
    const { columns, record, idx } = props;
    const widthSum = useMemo(() => {
        return columns.reduce((a, b) => a?.width || a + b?.width || b, 0);
    }, [columns]);
    return columns.map((column) => {
        const { key, width, align = 'center', className } = column;
        let renderEle = null;
        let classNames = ['tableCell', className];
        if (record?.[key] !== undefined && record?.[key] !== null) {
            if (column.render && typeof column.render === 'function') {
                renderEle = column.render(record[key], record, idx);
            } else {
                renderEle = record[key];
            }
        } else if (column.render && typeof column.render === 'function') {
            renderEle = column.render(null, record, idx);
        } else {
            classNames.push('empty');
        }
        return (
            <TableCell
                key={key}
                align={align}
                width={`${(width / widthSum).toFixed(2) * 100}%`}
                classNames={classNames}
            >
                {renderEle ? renderEle : "暂无"}
            </TableCell>
        );
    });
}

function TableCell(props) {
    const { children, classNames, ...otherProps } = props;
    return (
        <td className={classnames(...classNames)} {...otherProps}>
            {children}
        </td>
    );
}

export function NoData(props) {
    return (
        <div className="emptyArea">
            <i className="iconfont icon-kong"></i>
            <div className="emptyText">{props?.title || '暂无数据'}</div>
        </div>
    );
}

export function TransformString2Jsx(id, domString) {
    useEffect(() => {
        const ele = document.getElementById(id);
        ele.innerHTML = domString;
    }, [id]);
    return <div id={id}></div>;
}
