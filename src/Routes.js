import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

import AsyncComponent from './AsyncComponent'

const renderHome = () => import(/* webpackChunkName: "home" */ './pages/Home')
const renderPayment = () => import(/* webpackChunkName: "payment" */ './pages/Payment')
const renderTransaction = () => import(/* webpackChunkName: "transaction" */ './pages/Transaction')

const Routes = (props) => (
    <Router {...props}>
        <div>
            <Link to="/">Home</Link><br/>
            <Link to="/payment">Payment</Link><br/>
            <Link to="/transaction">Transaction</Link><br/>
            <Switch>
                <Route exact path='/' component={() => <AsyncComponent moduleProvider={renderHome} />} />
                <Route path='/payment' component={() => <AsyncComponent moduleProvider={renderPayment} />} />
                <Route path='/transaction' component={() => <AsyncComponent moduleProvider={renderTransaction} />} />
            </Switch>
        </div>
    </Router>
)

export default Routes