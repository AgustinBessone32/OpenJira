import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import React, { useContext } from 'react'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Item1', 'Item2', 'Item3']

export const SideBar = () => {

    const {sideMenuOpen, closeSideMenu} = useContext(UIContext)

    return (
        <Drawer
            anchor='left'
            open={sideMenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{width: 250}}>

                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>Menú</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <LabelOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />


            </Box>


        </Drawer>
    )
}
