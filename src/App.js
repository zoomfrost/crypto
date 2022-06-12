
import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';

import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, News} from './components';
import ErrorBoundary from './components/error/ErrorBoundary';

import './App.scss';

const App = () => {
	return (
		<div className='app'>
			<div className='navbar'>
				<Navbar />
			</div>
			<main className='main'>
				<Layout>
					<div className="routes">
						<Switch>
							<Route exact path='/'>
								<ErrorBoundary>
                                    <Homepage />
                                </ErrorBoundary>
							</Route>
							<Route exact path='/cryptocurrencies'>
								<ErrorBoundary>
                                    <Cryptocurrencies />
                                </ErrorBoundary>
							</Route>
							<Route exact path='/cryptocurrencies/:coinId'>
								<ErrorBoundary>
                                    <CryptoDetails />
                                </ErrorBoundary>
							</Route>
							<Route exact path='/news'>
								<ErrorBoundary>
                                    <News />
                                </ErrorBoundary>
							</Route>
						</Switch>
					</div>
				</Layout>
				<footer className='footer'>
					<Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
						Cryptoverse <br />
						All rights reserverd
					</Typography.Title>
					<Space>
						<Link to='/'>Home</Link>
						<Link to='/news'>News</Link>
					</Space>
				</footer>
			</main>
		</div>
	)
}

export default App
