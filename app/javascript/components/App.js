import React from 'react'
import InputSection from "./InputSection";

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
                <InputSection/>
            </div>
        )
    }
}

export default App