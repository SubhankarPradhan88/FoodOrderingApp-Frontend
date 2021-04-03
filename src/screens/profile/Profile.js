import React from 'react';

import Header from '../../common/header/Header';

export const Profile = (props) => {
    return(
        <React.Fragment> 
           <Header 
                history={props.history}
                displayItems = {{
                    hideProfileOption: true,
                    displaySearchBar: false
                }}
            />
            <h3 style={{ textAlign: 'center'}}>Profile Page</h3>
        </React.Fragment>
    )
}