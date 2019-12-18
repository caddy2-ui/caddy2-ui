import React, { useState, Fragment, useRef, ReactElement } from "react";
import {
  Menu,
  IconButton,
} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';

interface Props {
  size?: 'small' | 'medium'
}

export const MoreOptions: React.StatelessComponent<Props> = ({
  size = 'medium',
  children,
}) => {

  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };
  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <Fragment>
      <IconButton
        onClick={handleMenuOpen}
        ref={moreRef}
        size={size}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={moreRef.current}
        onClose={handleMenuClose}
        open={openMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </Menu>
    </Fragment>
  )
}
