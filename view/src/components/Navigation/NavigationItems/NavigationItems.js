import React, {Component} from 'react';
import NavigationItem from './NavigationItem';
import axios from "axios";

class NavigationItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        this.getNavigation();
    };

    getNavigation = () => {
        axios.get(
            process.env.REACT_APP_API_URL + 'c/',
        ).then((response) => {
            if (response.data) {
                this.setState({categories: response.data});
            } else {
                this.setState({categories: []});
            }
        });
    }

    render() {
        // const current = this.props.match.params.code;
        const {categories} = this.state;
        return (
            <>
                <ul className="nav-list">
                    {categories.map(category => {
                        const {name, code} = category;
                        return (
                            <NavigationItem
                                key={code}
                                link={"/categories/" + code}
                                exact>{name}</NavigationItem>
                        )
                    })}
                </ul>
            </>
        );
    }
}

export default NavigationItems;