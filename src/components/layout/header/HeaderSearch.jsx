import React, { useState } from 'react';
import { Input, Dropdown, Button } from 'antd';
import useMobile from '@utils/Mobile.jsx';

const { Search } = Input;

export default function HeaderSearch(props) {
    const [category, setCategory] = useState('Tutte le categorie');
    const isMobile = useMobile();

    let items = [
        {
            key: 'Tutte le categorie',
            label: 'Tutte le categorie',
        },
        { type: 'divider' },
    ];

    if (props.categories)
        props.categories.forEach((c) => {
            items.push({
                key: c.name_it,
                label: c.name_it,
            });
        });

    const dropdownCategory = (
        <Dropdown
            menu={{
                items,
                onClick: (value) => {
                    setCategory(value.key);
                },
            }}
        >
            <Button
                type={'primary'}
                style={{
                    minWidth: 160,
                    fontSize: 16,
                    height: 38,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    marginLeft: -12,
                    marginRight: -12,
                }}
            >
                {category}
            </Button>
        </Dropdown>
    );

    return isMobile ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 64 }}>
            <Search
                size="large"
                placeholder="Inizia la ricerca!"
                onSearch={() => {}}
                enterButton
                style={{ width: '100%' }}
            />
        </div>
    ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Search
                size="large"
                placeholder="Inizia la ricerca!"
                addonBefore={dropdownCategory}
                onSearch={() => {}}
                enterButton
                style={{ marginTop: 16, width: '60%' }}
            />
        </div>
    );
}
