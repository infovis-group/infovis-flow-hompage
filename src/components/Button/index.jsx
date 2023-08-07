import React, { useCallback } from 'react';
import './index.scss';

export default function Button(props) {
    const { text, icon, color, onClick } = props;
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);
    return (
        <button className={`myButton ${text === '删除' ? 'delete' : ''} ${text === '编辑' ? 'edit' : ''}`} style={{ color: color }} onClick={handleClick}>
            {icon && <i className='iconfont' >{icon}</i>}
            {text}
        </button>
    );
}
