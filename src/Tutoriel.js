import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import React, { useReducer, useEffect } from 'react';
import './css/Tutoriel.css';
import Body from './component/body'

const TOUR_STEPS = [
    {
        title: "Guide d'utilisation",
        target: '.boutonDroite',
        content: 'Vous pouvez à tout moment retrouver ce tutoriel dans la section aide.',
        disableBeacon: true,
    },

    {
        title: "Guide d'utilisation",
        target: '.lignes',
        content: 'Vos anciennes sections sont grisées. Elles ne sont pas perdues mais vous ne pouvez plus les modifier.',


    },
    {
        title: "Guide d'utilisation",
        target: '.start',
        content: 'Pour ajouter une section, cliquez sur le bouton "Ajouter".',
        spotlightClicks: true,
    },
    {
        title: "Guide d'utilisation",
        target: '.ligne',
        content: 'Les champs libres ont été remplacés par une liste déroulante. Les sections sont classées par ordre alphabétique, choisissez la section qui vous convient.',
    },

    {
        title: "Guide d'utilisation",
        target: '.selectItem',
        content: 'Vous pouvez séléctionner via le menu déroulant. Pour aller plus vite, vous pouvez inscrire le nom de la section.',
        spotlightClicks: true,
    },

];
const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,

    disableCloseOnEsc: true,
    disableOverlayClose: true,

    showProgress: true
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "START":
            return { ...state, run: true };
        case "RESET":
            return { ...state, stepIndex: 0 };
        case "STOP":
            return { ...state, run: false };
        case "NEXT_OR_PREV":
            return { ...state, ...action.payload };
        case "RESTART":
            return { ...state, stepIndex: 1, run: true, loading: false, key: new Date(), };
        default:
            return state;
    }
};

const Tour = () => {

    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

    const callback = data => {
        const { action, index, type, status } = data;
        if (action === ACTIONS.CLOSE
            ||
            (status === STATUS.SKIPPED && tourState.run)
            ||
            (status === STATUS.FINISHED)
        ) {
            dispatch({ type: "STOP" });
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
            dispatch({
                type: "NEXT_OR_PREV",
                payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) }
            });
        };

    }

    function click() {

        return dispatch({ type: "RESTART" });
    }

    useEffect(() => {
    }, [tourState])

    useEffect(() => {
        let tour = true;
        if (tour) {
            if (!localStorage.getItem("tour")) {
                tour = false
                dispatch({ type: "START" });
            }
        }
    }, [])

    return (
        <>
            <Joyride
                {...tourState}
                callback={callback}
                styles={{
                    options: {
                        backgroundColor: '#335f8a',
                        textColor: '#F5F3F2',

                        arrowColor: '#335f8a',
                        width: 350,
                        fontFamily: 'Roboto',
                        textAlign: 'center',
                        borderRadius: 50
                    },
                    h4: {
                        textAlign: "center",
                    },
                    tooltipContainer: {
                        textAlign: "justify",
                        color: "#F5F3F2",
                    },

                    buttonNext: {
                        backgroundColor: "#5574a0",
                        opacity: 20,
                        color: "#d9e1eb",
                        fontSize: '18px',
                        fontWeight: 'bold',
                    },

                    buttonBack: {
                        color: "#a4b7cf",
                        fontSize: '15px',
                        fontWeight: 'bold',
                    },

                    buttonClose: {
                        width: '20px',
                        height: '20px',

                    },

                }}
                locale={{
                    next: "Suivant",
                    skip: "Passer l'intro",
                    back: "Précédent",
                    last: "Terminer",
                }}


            />
            <button className="btn btn-primary boutonDroite" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >?</button>
            <h5 className="titre">Test des tutoriels</h5>
            <button className="btn btn-primary start">
                + Ajouter
            </button>
            <Body/>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header aide">
                    <h5 id="offcanvasRightLabel">Aide</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body sidebar">
                    <div className="accordion accordion-flush a" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Tutoriel
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                <label style={{'margin-top':'5px'}}className="form-check-label" htmlFor="flexSwitchCheckDefault">Sections </label>
                                <button className="btn btn-primary play" style={{ 'backgroundColor': '#327dc5', 'borderColor': 'lightgrey' }} onClick={click} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Relancer le tuto"><i class="bi bi-play-fill"></i></button>
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Tour;