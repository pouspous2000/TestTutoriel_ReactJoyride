:warning: React-Joyride doesn’t work yet with version higher than React 17.0.0 :warning:

 

<h1> :round_pushpin: What React-Joyride is for ? </h1>

React-Joyride is a react component used to create interactive tutorial on website.

<h1> :round_pushpin: How to use it ? </h1>

<h3> a) Install React-Joyride on your current react project </h3>

```
npm i react-joyride
```

<h3> b) Define the different import in your file </h3>

```
import Joyride from ‘react-joyride’;
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
```

<h3> c) Define the different the tutorial’s steps (target and content) </h3>

__target__ : targeting the particular classNames (or id) that will hold the content of the tour on the page.

__content__ : the content property is where we define the text .


```
const TOUR_STEPS = [
  {
   target: '.disable',
   content: 'Vos anciennes sections sont grisées. Elles ne sont pas perdues mais vous ne pouvez plus les modifier.',
  },
  {
   target: '.tutoriel-bouton-ajouter',
   content: 'Pour ajouter une section, cliquez sur le bouton "Ajouter".',
  },
]
```

<h3> d) Define the step’s default values (run, continuous, loading, stepIndex, steps, key) </h3>

__run__ : Set the run field to false, to ensure that the tour doesn’t start automatically.

__continuous__ :  Set the continuous prop to true, because we want to show the button.

__stepIndex__ : stepIndex is the index number, which is set to 0.

__steps__: The steps field is set to the TOUR_STEPS that we declared in step 1

__key__ : The key field makes the tour re-render when the tour is restarted.

```
 const INITIAL_STATE = {
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0, // Make the component controlled
  steps: TOUR_STEPS,
  key: new Date(), // This field makes the tour to re-render when the tour is restarted
};
```

<h3> e) Different props : </h3>

Those different step can be add toINITIAL_STATE if it’s common to all the tutorial, else it can be add individually in each step 

__title__ : will appear on the top of the tool tips (can be html beacon or a string) 

__diseableBeacon (Boolean)__ : the tutorial start without clicking on the beacon. 

__spotlightClicks (Boolean)__ : allow to interact with the code (ex : click on a button)

__style (object)__ : overwrite the default styling

```
styles={{
                    options: {
                        backgroundColor: '#335f8a',
                        textColor: '#F5F3F2',
                        arrowColor: '#335f8a',
                    },
                    tooltipContainer: {
                        textAlign: "justify",
                        color: "#F5F3F2",
                    },
                    buttonNext: {
                        backgroundColor: "#5574a0",
                        color: "#d9e1eb",
                        fontSize: '18px',
                        fontWeight: 'bold',
                    }
                }}
```

:warning:  some styles need to be overwrite on a css file (ex : title) :warning:
 

__placementBeacon (string)__ : set the placement of the Beacon (can be : top, bottom, left, right)

__placement (string)__ : placement of the tooltip ( can be :                                   top, top-start, top-end; bottom, bottom-start, bottom-end; left, left-start, left-end right, right-start, right-end auto (it will choose the best position)center (set the target to body)

__event (string)__ : the event to trigger the beacon. It can be click or hover

__isFixed (boolean)__ : Force the step to be fixed.

__offset (number)__:The distance from the target to the tooltip.

__showProgress (boolean)__ : display the progress in the tutorial

__showSkipButton (boolean)__ 

__disableCloseOnEsc  (boolean)__: enable to quit the tutorial by pushing esc button.

__disableOverlayClose (boolean)__ : enable to quit the tutorial by clicking outside the tooltip.

__hideBackButton (boolean)__ 

__hideCloseButton (boolean)__ 

__local (object)__ : enable to change the button’s default name.  (ex :   

```

  locale={{
    next: "Suivant",
    skip: "Passer l'intro",
    back: "Précédent",
    last: "Terminer",
  }}
 
```
 

<h3> f) Manage the state with the reducer </h3>

```
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // start the tour
    case "START":
      return { ...state, run: true };
    // Reset to 0th step
    case "RESET":
      return { ...state, stepIndex: 0 };
    // Stop the tour
    case "STOP":
      return { ...state, run: false };
    // Update the steps for next / back button click
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    // Restart the tour - reset go to 1st step, restart create new tour
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date()
      };
    default:
      return state;
  }
};
```
According to the events (start, stop, and reset), we’ve dispatched the proper state to manage the tour.

<h3> g) Create the callback </h3>

```
const callback = data => {
    const { action, index, type, status } = data;
    if (action === ACTIONS.CLOSE
                ||
       (status === STATUS.SKIPPED && tourState.run)
                ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) }
      });
    }
};
```
It listen the click events and then do some conditional operations. 

<h3> h) Start the tutorial </h3>

:arrow_right:  Autostart the Tour With useEffect :

```
useEffect(() => {
  if(!localStorage.getItem("tour"){
    dispatch({ type: "START"});
  }
}, []);
```
:arrow_right:  Trigger by a Button : 

```
const startTour = () => {
  dispatch({ type: "START" });
};
```
:warning:  if you want to use a button to reload the tutorial :warning: : 

```
const startTour = () => {
  dispatch({ type: "RESTART" });
};
```

<h3> i) Call your Joyride component in the return </h3>

```
return (
    <>
      <JoyRide
        {...tourState}
          callback={callback}
      />
        }}
      />
    </>
  );
};
```
 :tada:  And you are done ! :tada: 

 

 

<h1> :mag: Sources : </h1>

Official React-Joyride doc :  [Overview](https://docs.react-joyride.com/) !

Demo React-Joyride :  [React Joyride Demo](https://react-joyride.com/) !

Code Demo React-Joyride : [react-joyride-demo - CodeSandbox](https://codesandbox.io/s/react-joyride-demo-i1776) ! 

Creation of a functional react-joyride script step by step :  [A Practical Guide To Product Tours In React Apps](https://allprowebdesigns.com/2020/08/a-practical-guide-to-product-tours-in-react-apps/) ! 
