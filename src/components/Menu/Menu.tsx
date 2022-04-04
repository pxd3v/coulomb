import React, { useState } from 'react';
import './Menu.scss'
import Config from './Sections/Config/Config'
import Points from './Sections/Points/Points'

function Menu() {
  const [openPoints, setOpenPoints] = useState(true)
  return (
    <div className="Menu">
      <Config openPoints={openPoints} setOpenPoints={setOpenPoints}/>
      {openPoints && <Points />}
    </div>
  );
}

export default Menu;
