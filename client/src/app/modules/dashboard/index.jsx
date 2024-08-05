import * as React from 'react';

import Counter from '../../shared/components/counter';


const Dashboard = () => {
  return (
    <section className='app-dashboard'>
      <div className='app-content'>
        <h2>Dashboard</h2>

        <Counter />
      </div>
    </section>
  );
};

export default Dashboard;
