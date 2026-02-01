import CaseImage from "./cubing/cubeImage.jsx";

export default function OllGroupSelector({ arrowOllSet, onSelectGroup, caseDetails }) {
  

    console.log("Here", arrowOllSet, onSelectGroup, caseDetails)
    return (
    <div className="OllGroupOptionsGrid">
      {arrowOllSet.map((group, i) => (
        <div
          key={i}
          className="OllGroupOptionsItem"
          onClick={() => onSelectGroup(i)}
        >
          <h2 className="GroupItemName">{group[0].group}</h2>

          <CaseImage
            size={80}
            alg={group[0].algs}
            caseSetDetails={caseDetails}
          />
        </div>
      ))}
    </div>
  );
}
