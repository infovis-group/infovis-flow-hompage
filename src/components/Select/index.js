import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.scss';

export default function Select(props) {
    const { showSearch = false, value, options = [], placeholder = '', onChange, k, onSearch, ...otherProps } = props;
    const [optVisible, setOptVisible] = useState(false);
    const [currentValue, setCurrentValue] = useState('');
    const [clearIconVisible, setClearIconVisible] = useState(false);
    const [searchParam, setSearchParam] = useState('');
    const [optBySearch, seOptBySearch] = useState([]);
    const inputRef = useRef(null);
    const handleClick = useCallback(() => {
        setOptVisible(!optVisible);
    }, [optVisible]);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    const showClearIcon = useMemo(() => {
        return clearIconVisible && currentValue && !optVisible;
    }, [clearIconVisible, currentValue, optVisible]);
    const showDropOptions = useMemo(() => {
        return optVisible && (!!options.length || !!optBySearch.length);
    }, [optVisible, options, optBySearch]);
    const selectOptions = useMemo(() => {
        return showSearch ? optBySearch : options;
    }, [showSearch, optBySearch, options]);

    const afterSearch = useCallback((data) => {
        if (data.length) {
            const newOptions = data.map((item) => {
                return {
                    name: item.name,
                    value: item.id
                };
            });
            seOptBySearch(newOptions);
            setOptVisible(true);
        } else {
            setOptVisible(false);
        }
    }, []);

    return (
        <div
            className="select-wrapper"
            onMouseLeave={() => {
                setOptVisible(false);
            }}
            {...otherProps}
        >
            <div className="select" style={{ cursor: showSearch ? '' : 'pointer' }} onClick={handleClick} onMouseEnter={() => setClearIconVisible(true)} onMouseLeave={() => setClearIconVisible(false)}>
                <div
                    className="select-value"
                    ref={inputRef}
                    suppressContentEditableWarning
                    contentEditable={showSearch}
                    onBlur={() => {
                        if (!currentValue && !searchParam) {
                            inputRef.current.innerText = placeholder;
                        }
                    }}
                    onFocus={() => {
                        if (!currentValue && !searchParam) {
                            inputRef.current.innerText = '';
                        }
                    }}
                    onInput={_.debounce(() => {
                        if (!showSearch) {
                            return;
                        }
                        if (onSearch) {
                            onSearch(inputRef.current.innerText, afterSearch);
                        }
                        setSearchParam(inputRef.current.innerText);
                    }, 500)}
                >
                    {currentValue ? currentValue : placeholder}
                </div>
                {!showClearIcon && <i className={`iconfont icon-arrowdown ${showDropOptions ? 'reverse' : ''}`}></i>}
                {showClearIcon && (
                    <i
                        className={`iconfont icon-close`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentValue('');
                            setSearchParam('');
                            if (onChange) {
                                onChange('', null, k);
                            }
                        }}
                    ></i>
                )}
            </div>
            {showDropOptions && (
                <div className="select-options">
                    {selectOptions.map((option) => {
                        const { value, name } = option;
                        return (
                            <div
                                className="option"
                                key={value}
                                onClick={() => {
                                    if (onChange) {
                                        onChange(value, name);
                                    }
                                    setCurrentValue(name);
                                    setOptVisible(false);
                                }}
                            >
                                {name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
