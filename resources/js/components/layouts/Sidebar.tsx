import React, { useState } from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useHistory, useLocation } from 'react-router-dom';

function Sidebar() {

    const history = useHistory();
    const location = useLocation();

    return (
    <>
        <div className="col-2 bg-gray py-3">
        <Navigation
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
              history.push(itemId);
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/',
              },
              {
                title: 'Manufacturer',
                itemId: '/manufacturer',
              },
            ]}
          />
        </div>
    </>
    );
}

export default Sidebar
