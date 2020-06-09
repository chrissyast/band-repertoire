import React from 'react'

class AnotherComponent extends React.Component{

    render() {
        return (
            <div>This is another component which is also working {this.props.string}</div>
        )
    }

    componentDidMount() {
        console.log("another component mounted")
    }
}

export default AnotherComponent