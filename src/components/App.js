import React from 'react';
import '../styled/reset.css'
import '../styled/theme.css'
import './responsive.css'
import OwnLip from './OwnLip'
import Layout from './Layout';
import './App.css'
import Transfer from './Transfer';
import EnemyLip from './EnemyLip';
import WorldLip from './WorldLip';

const routes = {
  OWNLIP: {
    component: OwnLip,
    path: "/"
  },
  ENEMYLIP: {
    component: EnemyLip,
    path: '/enemy-lip'
  },
  WORLDLIP: {
    component: WorldLip,
    path: '/world-lip'
  },
  TRANSFER: {
    component: Transfer,
    path: '/transfer'
  }
}


function App() {
  const [globalRoute, setGlobalRoute] = React.useState(routes.OWNLIP.path)

  // eslint-disable-next-line
  let displayComponent = Object.keys(routes).map((key) => {
    if (routes[key].path === globalRoute) {
      return <Layout key={Math.random()} Component={routes[key].component} setGlobalRoute={setGlobalRoute} />
    }
  })

  return (
    <main>
      {displayComponent}
    </main>
  );
}

export default App;
