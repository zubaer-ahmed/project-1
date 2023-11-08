import React from 'react';
import ProfileNavigation from '../../../Components/Customer/ProfileNavigation';
import RecentServices from '../../../Components/Customer/RecentServices';

const index = () => {
  return (
    <>
    <div className="flex">
    <ProfileNavigation/>
    <RecentServices/>
    </div>
    </>
  )
}

export default index