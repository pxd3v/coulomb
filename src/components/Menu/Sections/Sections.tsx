import './Sections.scss'

export enum PossibleSections {
    CONFIG = 'Config',
    POINTS = 'Points'
}

interface ISectionsProps {
    focusedSection: PossibleSections
    onChangeFocusedSection: (newValue: PossibleSections) => void
}

function Sections({ focusedSection, onChangeFocusedSection }: ISectionsProps) {
  return (
    <div className="Sections">
        <button onClick={() => onChangeFocusedSection(PossibleSections.CONFIG)}>Config</button>
        <button onClick={() => onChangeFocusedSection(PossibleSections.POINTS)}>Points</button>
    </div>
  );
}

export default Sections;
