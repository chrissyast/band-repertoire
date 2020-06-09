import React from 'react'
import AnotherComponent from "./AnotherComponent";

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            string : 'bar'
        }
    }

    render() {
        return (
            <div>
                <div>This is working and reloading foo sjkl</div>
                <AnotherComponent string={this.state.string}/>
                <AnotherComponent string={"pissface"}/>
                <AnotherComponent/>
            </div>
        )
    }
}

export default App