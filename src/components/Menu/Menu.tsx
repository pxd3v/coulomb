import React, { useCallback, useState } from 'react';
import './Menu.scss'
import Sections, { PossibleSections } from './Sections/Sections';
import Config from './Sections/Config/Config'
import Points from './Sections/Points/Points'

function Menu() {
  const [focusedSection, setFocusedSection] = useState<PossibleSections | null>(null)
  const onChangeFocusedSection = useCallback((newValue: PossibleSections | null) => {
    setFocusedSection(newValue)
  }, [])
  
  const possibleComponents = {
    Config,
    Points
  }

  const ComponentToUse = possibleComponents[focusedSection!]
  return (
    <div className="Menu">
        <Sections 
          focusedSection={focusedSection}
          onChangeFocusedSection={onChangeFocusedSection}
        />
        <div className="Menu__RenderArea">
          {focusedSection && ComponentToUse()}
        </div>
    </div>
  );
}

export default Menu;
