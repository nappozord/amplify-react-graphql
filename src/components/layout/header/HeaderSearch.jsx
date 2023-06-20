import React, {useState} from "react";
import {Select, Input, Dropdown, Button} from "antd";

const {Option} = Select;
const {Search} = Input;

const selectCategory = (
    <Select defaultValue="Tutte le categorie" style={{ backgroundColor: '#f0f0f0', minWidth: 150 }}>
        <Option value="Tutte le categorie">Tutte le categorie</Option>
        <Option value="Nascita">Nascita</Option>
        <Option value="Laurea">Laurea</Option>
        <Option value="Addio al celibato">Addio al celibato</Option>
    </Select>
);

const items = [
    {
        key: 'Tutte le categorie',
        label: 'Tutte le categorie',
    },
    {
        key: 'Nascita',
        label: 'Nascita',
    },
    {
        key: 'Laurea',
        label: 'Laurea',
    },
    {
        key: 'Addio al celibato',
        label: 'Addio al celibato',
    },
];

export default function HeaderSearch(props) {
    const [category, setCategory] = useState('Tutte le categorie');

    const dropdownCategory = (
        <Dropdown menu={{ items, onClick: (value) => {setCategory(value.key)} }} >
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

    return (
        <div style={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
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