import React from 'react'
import PropTypes from 'prop-types'
import { Observable } from 'rxjs/Rx'

const jsonp = (url) => new Observable(observer => {
    jsonp.counter++
    const key = '__jsonp_callback' + jsonp.counter
    window[key] = (response) => {
        script.parentNode.removeChild(script)
        delete window[key]
        observer.next(response)
        observer.complete()
    }
    const script = document.createElement('script')
    script.src = url + key
    script.onerror = (err) => observer.error(err)
    document.head.appendChild(script)
})
jsonp.counter = 0

const renderStylesheet = (href) => {
    const link = document.createElement('link')
    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = href
    return link
}

class Gist extends React.Component {
    constructor(props) {
        super(props)
        this.state = { div: "" }
    }

    componentDidMount() {
        this.setState({ subscription: 
            jsonp(`${this.props.src}?callback=`).subscribe(
                value => {
                    const Stylesheet = renderStylesheet(value.stylesheet)
                    this.setState({ Stylesheet })
                    document.head.appendChild(Stylesheet)
                    this.setState({ div: value.div })
                },
                err => console.error("[Gist.js] - ", err)
            )
        })
    }

    componentWillUnmount() {
        this.state.subscription.unsubscribe()
        this.state.Stylesheet && document.head.removeChild(this.state.Stylesheet)
    }

    render() {
        return <div dangerouslySetInnerHTML={{ __html: this.state.div }}/>
    }
}

Gist.propTypes = {
    src: PropTypes.string.isRequired
}

export default Gist