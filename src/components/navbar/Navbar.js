import {useEffect} from 'react';
import { Button, Typography, Avatar} from 'antd';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, MenuOutlined, FundOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { cryptoSetScreenSize, cryptoMenuToggle } from '../../slices/cryptoSlice';

import icon from '../../images/cryptocurrency.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const screenSize = useSelector(state => state.crypto.screenSize);
    const activeMenu = useSelector(state => state.crypto.activeMenu);

    const {pathname} = useLocation();

    useEffect(() => {
        const handleResize = () => dispatch(cryptoSetScreenSize(window.innerWidth));

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    useEffect(() => {
        screenSize <= 800 ? dispatch(cryptoMenuToggle(false)) : dispatch(cryptoMenuToggle(true));
    }, [screenSize]);

    useEffect(() => {
        if (screenSize <= 800) {
            dispatch(cryptoMenuToggle(false));
        }
    }, [pathname]);
    
    
    return (
        <nav className='menu'>
            <div className="menu__logo">
                <Avatar src={icon} />
                <Typography.Title level={2} className='menu__title'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
                <Button onClick={() => activeMenu ? dispatch(cryptoMenuToggle(false)) : dispatch(cryptoMenuToggle(true))} className='menu__btn'>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <ul className='menu__list'>
                    <li key='home' className='menu__link'>
                        <span><HomeOutlined /></span>
                        <NavLink exact activeStyle={{'fontWeight': 'bold', 'color': 'var(--bgPrimary)'}} to='/'>Home</NavLink>
                    </li>
                    <li key='crypto' className='menu__link'>
                        <span><FundOutlined /></span>
                        <NavLink exact activeStyle={{'fontWeight': 'bold', 'color': 'var(--bgPrimary)'}} to='/cryptocurrencies'>Cryptocurrencies</NavLink>
                    </li>
                    <li key='news' className='menu__link'>
                        <span><BulbOutlined /></span>
                        <NavLink exact activeStyle={{'fontWeight': 'bold', 'color': 'var(--bgPrimary)'}} to='/news'>News</NavLink>
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navbar