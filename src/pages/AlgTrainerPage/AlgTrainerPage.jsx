import React, { useContext } from "react";
import { ThemeContext } from '../../DarkThemeContext.jsx';
import { FaIcon } from '../../assets/fontAwesome.js';
import CaseImage from "../../components/Oll/cubing/cubeImage.jsx";
import Stopwatch from '../../components/Train/Stopwatch.jsx';
import '../../styling/index.css';


function AlgTrainerPage({ testedAlgs, setButtonClicked, setCaseClicked }) {


    const TestBackClick = () => {
        setButtonClicked(prev => !prev)
        setCaseClicked(true)
    }

    const BackButtonstyle = {
        width: "75px",
        height: "40px",
        alignItems: "center",
        fontWeight: "bold",
        borderWidth: "2px",

    }

    const ScrambleDetails = {
        id: "oll",
        title: "OLL",
        subTitle: "Full OLL",
        view: "plan",
        numCases: 57,
    }
    const ScrambleVisualizerDetails = {
        id: "oll",
        title: "OLL",
        subTitle: "Full OLL",
        view: "plan",
        stage: "cross",
        numCases: 57,
    }

    let scramble = "F L2 U2 L2 R2 B2 L2 U2 R2 F R2 F U L' F R2 B2 F2 R2 U' B D2 L"
    let scramble2 = "R U R' U R U2 R'"

    const { darkMode } = useContext(ThemeContext)


    return (
        <>
            <div className='TestContainersCont'>
                <div className='TestSessionCont'>
                    <div className='TestPbCont'>
                        <table className='TestPbTable'>
                            <tbody>
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        Current
                                    </th>
                                    <th>
                                        Best
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Time
                                    </th>
                                    <td>
                                        10.08.05
                                    </td>
                                    <td>
                                        10.08.05
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        mo3
                                    </th>
                                    <td>
                                        9.05
                                    </td>
                                    <td>
                                        10.03.40
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        ao5
                                    </th>
                                    <td>
                                        8.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        ao12
                                    </th>
                                    <td>
                                        8.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        ao25
                                    </th>
                                    <td>
                                        8.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        ao100
                                    </th>
                                    <td>
                                        8.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        ao1000
                                    </th>
                                    <td>
                                        8.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className='TestLastSolvesCont'>
                        <table className='TestTimeTable'>
                            <tbody>
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        Time
                                    </th>
                                    <th>
                                        ao5
                                    </th>
                                    <th>
                                        ao12
                                    </th>
                                </tr>

                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        10.03.40
                                    </td>
                                    <td>
                                        10.03.40
                                    </td>
                                    <td>
                                        10.03.40
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        4003
                                    </td>
                                    <td>
                                        4.05
                                    </td>
                                    <td>
                                        3.40
                                    </td>
                                    <td>
                                        8.05
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='Timercontainer '>
                    <div className='TestButtonsCont row align-items-center d-flex alignItems:"center"'>
                        <div style={{ height: "50px", alignItems: "center" }} className='col p-0 justify-content-start d-flex'>
                            <button onClick={() => { TestBackClick() }}
                                className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                style={{
                                    ...BackButtonstyle,

                                    "--bs-border-style": "solid",
                                    "--bs-border-color": "white",
                                    "--bs-btn-hover-border-color": "red",
                                    "--bs-btn-focus-border-color": "red",
                                    "--bs-btn-active-border-color": "red",
                                }}
                            >
                                Back
                            </button>
                        </div>
                        <div className='col p=0 d-flex justify-content-end'>
                            <button
                                className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                style={{
                                    ...BackButtonstyle,

                                    "--bs-border-style": "solid",
                                    "--bs-border-color": "white",
                                    "--bs-btn-hover-border-color": "red",
                                    "--bs-btn-focus-border-color": "red",
                                    "--bs-btn-active-border-color": "red",

                                }}
                            >
                                Skip
                            </button>
                        </div>
                    </div>

                    <div className="TestingCont">
                        <h3 className='ScrambleText'> {scramble}</h3>

                        <Stopwatch></Stopwatch>

                        <div className='TestExCont'>

                            <h2 className='TestCaseName'>OLL 52</h2>

                            <div className='AllTestButtonCont'>
                                <button id="TestHes" className='TestButton'>
                                    <FaIcon icon="spinner" style={{ color: "white" }} />
                                </button>
                                <div className='TestGoodOkBadCont'>
                                    <button id="TestGood" className='TestButton'>
                                        <FaIcon icon="check" style={{ color: "rgb(10, 250, 10)", fontSize: "20px" }} />
                                    </button>
                                    <button id="TestOk" className='TestButton'>
                                        <FaIcon icon="minus" style={{ color: "rgb(255, 242, 1)", fontSize: "20px" }} />
                                    </button>
                                    <button id="TestBad" className='TestButton'>
                                        <FaIcon icon="xmark" style={{ color: "red", fontSize: "20px" }} />
                                    </button>

                                </div>
                                <button id="TestTrash" className='TestButton'>
                                    <FaIcon icon="trash" style={{ color: "white", fontSize: "20px" }} />
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className='TestSessionContSmall'>
                        <div className='VisualScramble'>
                            <div>

                            </div>
                            <div className='VisualScrambleCube'>
                                <CaseImage
                                    size={100}
                                    alg={"" + scramble2.replace(/\s+/g, "") + "y2z2"}
                                    caseSetDetails={ScrambleVisualizerDetails}
                                ></CaseImage>
                            </div>
                            <div>

                            </div>
                            <div>

                            </div>

                            <div className='VisualScrambleCube'>
                                <CaseImage
                                    size={100}
                                    alg={"zx'y2" + scramble2.replace(/\s+/g, "") + "y2z2"}
                                    caseSetDetails={ScrambleVisualizerDetails}
                                ></CaseImage>
                            </div>
                            <div className='VisualScrambleCube'>
                                <CaseImage
                                    size={100}
                                    alg={"zx'y" + scramble2.replace(/\s+/g, "") + "y2z2"}
                                    caseSetDetails={ScrambleVisualizerDetails}
                                ></CaseImage>
                            </div>
                            <div className='VisualScrambleCube'>
                                <CaseImage
                                    size={100}
                                    alg={"zx'" + scramble2.replace(/\s+/g, "") + "y2z2"}
                                    caseSetDetails={ScrambleVisualizerDetails}
                                ></CaseImage>
                            </div>
                            <div className='VisualScrambleCube'>
                                <CaseImage
                                    size={100}
                                    alg={"zx'y'" + scramble2.replace(/\s+/g, "") + "y2z2"}
                                    caseSetDetails={ScrambleVisualizerDetails}
                                ></CaseImage>
                            </div>
                            <div>

                            </div>
                            <div className='VisualScrambleCube'>
                                <CaseImage
                                    size={100}
                                    alg={"y2z2" + scramble2.replace(/\s+/g, "") + "y2z2"}
                                    caseSetDetails={ScrambleVisualizerDetails}
                                ></CaseImage>
                            </div>

                        </div>
                        <div className='TestPbContSmall'>
                            <table className='TestPbTable'>
                                <tbody>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>
                                            Current
                                        </th>
                                        <th>
                                            Best
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            Time
                                        </th>
                                        <td>
                                            8.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            mo3
                                        </th>
                                        <td>
                                            8.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            ao5
                                        </th>
                                        <td>
                                            8.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            ao12
                                        </th>
                                        <td>
                                            8.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            ao25
                                        </th>
                                        <td>
                                            8.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            ao100
                                        </th>
                                        <td>
                                            8.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            ao1000
                                        </th>
                                        <td>
                                            10.08.05
                                        </td>
                                        <td>
                                            10.08.05
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className='TestLastSolvesContSmall'>
                            <table className='TestTimeTableSmall'>
                                <tbody>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>
                                            Time
                                        </th>
                                        <th>
                                            ao5
                                        </th>
                                        <th>
                                            ao12
                                        </th>
                                    </tr>

                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            10.08.05
                                        </td>
                                        <td>
                                            10.08.05
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                        <td>
                                            8.05
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                        <td>
                                            8.05
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                        <td>
                                            8.05
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                        <td>
                                            8.05
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                        <td>
                                            8.05
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4003
                                        </td>
                                        <td>
                                            4.05
                                        </td>
                                        <td>
                                            3.40
                                        </td>
                                        <td>
                                            8.05
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlgTrainerPage