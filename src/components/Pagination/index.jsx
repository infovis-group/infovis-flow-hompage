import React, { useEffect, useState, useMemo, useCallback } from 'react';

export default function Pagination(props) {
    const { pageIndex, pageSize, pageCount, total, onPageNumChange } = props;
    const [pages, setPages] = useState([]);
    const [current, setCurrent] = useState(pageIndex);
    const [currentAction, setCurrentAction] = useState('');
    useEffect(() => {
        let res = [];
        let leftArr = [];
        let centerArr = [];
        let rightArr = [];
        if (pageCount < 8) {
            leftArr = generateArray(1, pageCount);
            centerArr = [];
            rightArr = [];
        } else if (pageCount >= 8) {
            if (current <= 5) {
                leftArr = generateArray(1, 5);
                centerArr = [];
                rightArr = [pageCount];
            } else if (current > 5) {
                if (current >= pageCount - 3) {
                    leftArr = generateArray(1, 5);
                    centerArr = [];
                    rightArr = generateArray(pageCount - 5, pageCount);
                } else {
                    leftArr = [1];
                    centerArr = generateArray(current - 2, current + 2);
                    rightArr = [pageCount];
                }
            }
        }
        if (leftArr.length) {
            res = res.concat(leftArr);
        }
        if (centerArr.length) {
            res = res.concat([{ key: 'left' }]).concat(centerArr);
        }
        if (rightArr.length) {
            if (centerArr.length === 0 && current > pageCount / 2) {
                res = res.concat([{ key: 'left' }]).concat(rightArr);
            } else {
                res = res.concat([{ key: 'right' }]).concat(rightArr);
            }
        }
        setPages(res);
    }, [pageCount, current]);

    function generateArray(start = 0, end) {
        let array = [];
        for (let i = start; i < end + 1; i++) {
            array.push(i);
        }
        return array;
    }

    const onPageChange = useCallback(
        (page) => {
            let pageNum = page;
            if (typeof page === 'object') {
                if (page.key === 'right') {
                    pageNum = current + 5;
                    setCurrentAction('');
                }
                if (page.key === 'left') {
                    pageNum = current - 5;
                }
            } else {
                pageNum = page;
            }
            if (pageNum > pageCount) {
                pageNum = pageCount;
            }
            if (pageNum < 1) {
                pageNum = 1;
            }
            setCurrent(pageNum);
            if (onPageNumChange) {
                onPageNumChange(pageNum);
            }
        },
        [current, pageCount],
    );

    return (
        <div className="pagination-wrapper log-pagination">
            <div className="page-info">共有&nbsp;&nbsp;{total}&nbsp;&nbsp;条记录, 当前第&nbsp;&nbsp;{pageIndex}&nbsp;&nbsp;页, 共&nbsp;&nbsp;{pageCount}&nbsp;&nbsp;页</div>
            {pageCount ? (
                <ul className="page-list">
                    <li
                        className={`checked btn-prev ${current === 1 ? 'disabled' : ''}`}
                        onClick={() => onPageChange(current - 1)}
                    >
                        <i className="iconfont">&#xe693;</i>
                    </li>
                    {pages.map((page) => {
                        if (typeof page === 'object') {
                            return page.key === 'left' ? (
                                <li
                                    className="action"
                                    onMouseEnter={() => setCurrentAction('left')}
                                    onMouseLeave={() => setCurrentAction('')}
                                    onClick={() => onPageChange(page)}
                                >
                                    {currentAction === 'left' ? (
                                        <i className="iconfont">&#xeb0a;</i>
                                    ) : (
                                        <i className="iconfont">&#xeb12;</i>
                                    )}
                                </li>
                            ) : (
                                <li
                                    className="action"
                                    onMouseEnter={() => setCurrentAction('right')}
                                    onMouseLeave={() => setCurrentAction('')}
                                    onClick={() => onPageChange(page)}
                                >
                                    {currentAction === 'right' ? (
                                        <i className="iconfont">&#xeb09;</i>
                                    ) : (
                                        <i className="iconfont">&#xeb12;</i>
                                    )}
                                </li>
                            );
                        }
                        return (
                            <li
                                key={`${page}-page-item`}
                                className={`page-item ${current === page ? 'checked' : ''}`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </li>
                        );
                    })}
                    <li
                        className={`checked btn-next ${current === pageCount ? 'disabled' : ''}`}
                        onClick={() => onPageChange(current + 1)}
                    >
                        <i className="iconfont">&#xe666;</i>
                    </li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
}
