import React, { PureComponent } from 'react'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
			Component: () => <h1>Loading...</h1>
		}
	}

	componentDidMount() {
		this.props.moduleProvider().then(({Component}) => {
			this.setState({ Component })
		})
	}
	
	render() {
		return <this.state.Component/>
	}
}