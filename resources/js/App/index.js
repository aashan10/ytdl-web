import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Navigation';


export class App extends React.Component {

    render() {
        return (
            <Navigation/>
        );
    }

}

if(document.getElementById('app')){
    ReactDOM.render(<App/>, document.getElementById('app'));
}