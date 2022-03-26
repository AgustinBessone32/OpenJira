import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material'
import React, { FC, useContext } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';

export const NavBar: FC = () => {
    const {openSideMenu} = useContext(UIContext)

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton size='large' edge='start' onClick={openSideMenu}>
                    <MenuOutlinedIcon />
                </IconButton>

                <Typography variant='h6'>
                    <NextLink href='/' passHref>
                        <Link underline='none' color='white'>
                            <Typography variant='h6'>
                                OpenJira
                            </Typography>
                        </Link>
                    </NextLink>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
