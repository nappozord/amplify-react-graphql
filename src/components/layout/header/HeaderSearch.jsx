import React from "react";
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
        key: '0',
        label: 'Tutte le categorie',
    },
    {
        key: '1',
        label: 'Nascita',
    },
    {
        key: '2',
        label: 'Laurea',
    },
    {
        key: '3',
        label: 'Addio al celibato',
    },
];

const dropdownCategory = (
    <Dropdown menu={{ items }}>
        <Button
            type={'primary'}
            style={{
                fontSize: 16,
                height: 38,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                marginLeft: -12,
                marginRight: -12,
            }}
        >
            Seleziona Categoria
        </Button>
    </Dropdown>
);

export default function HeaderSearch(props) {
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