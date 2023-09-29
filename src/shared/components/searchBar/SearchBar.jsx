import React, {useState} from 'react';
import MyInput from "../../../UI/input/MyInput";
import MyButton from "../../../UI/button/MyButton";
import "./SearchBar.css"

const SearchBar = ({ onSearchSubmit }) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        onSearchSubmit(searchText);
    }

    return (
        <div className="searchbar-wrapper">
            <div className="searchbar">
                <MyInput  type="text" value={searchText} onChange={handleInputChange}></MyInput>
                <MyButton type="submit" onClick={handleSubmitSearch}>Найти</MyButton>
            </div>
        </div>
    );
};

export default SearchBar;