import React, {Component} from "react";
import './SearchBar.scss';

class SearchBar extends Component {

    render() {
        return (
            <>
                <div className="search__container">
                    <form action="/search">
                        <input className="search__input" type="text" placeholder="Search.." name="q" />
                    </form>
                </div>
            </>
        );
    }

}

export default SearchBar;