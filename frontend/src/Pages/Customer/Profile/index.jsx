import React from 'react'
import ProfileNavigation from './../../../Components/Customer/ProfileNavigation';
import AuthSection from '../../../Components/Customer/AuthSection';
import ProfileSection from '../../../Components/Customer/ProfileSection';
import GeneralInformation from '../../../Components/Customer/GeneralInformation';
import RecentServices from '../../../Components/Customer/RecentServices';
import TimeDate from '../../../Components/Customer/TimeDate';
import ConnectedMedia from '../../../Components/Customer/ConnectedMedia';

const index = () => {
  return (
    <>
    <div className='flex'>
        <ProfileNavigation/>
        <section>
            <ProfileSection/>
            <ConnectedMedia/>
        </section>
        <section class="w-1/2 h-2/3 my-4 mr-4 bg-white">
            <GeneralInformation/>
            <RecentServices/>
        </section>
    </div>
    </>
  )
}

export default index;