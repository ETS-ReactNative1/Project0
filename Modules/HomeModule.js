import React, { useEffect, useState, useContext, useRef } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const HomeModuleContext = React.createContext();

let SubEvent1 = [];
let SubEvent2 = [];
const SubEvent3 = ["sub5"];

export const scriptList = [
  "sub1",
  "sub2",
  "sub3",
  "sub4",
  "main1",
  "main2",
  "main3",
  "main4",
  "with1",
  "with2",
  "out1",
  "out2",
];

const sub1 = require("../JSON/SubEvent1.json");
const sub2 = require("../JSON/SubEvent2.json");
const sub3 = require("../JSON/SubEvent3.json");
const sub4 = require("../JSON/SubEvent4.json");
const sub5 = require("../JSON/SubEvent5.json");

const with1 = require("../JSON/With1.json");
const with2 = require("../JSON/With2.json");

const out1 = require("../JSON/Out1.json");
const out2 = require("../JSON/Out2.json");

const main1 = require("../JSON/MainEvent1.json");
const main2 = require("../JSON/MainEvent2.json");
const main3 = require("../JSON/MainEvent3.json");
const main4 = require("../JSON/MainEvent4.json");

const ep1 = ["sub2-b2", "sub3-b"];
const ep2 = ["sub1-b1", "J1-c1", "sub4-b1", "K2", "end5"];
const ep3a = ["A1", "F4", "sub2-b4", "with1-a2", "end3", "with2-b2", "sub3-a1"];
const ep3b = ["A1", "F4", "sub2-b4", "out1-d2", "end3", "sub3-a1", "out2-c2"];
const ep4 = ["A1", "A1-1", "B2-2"];

const epils = ["ep1", "ep2", "ep3a", "ep3b", "ep4"];

const mainEnding = require("../JSON/MainEnding.json");
const mainEndingList = ["end1", "end2", "end3", "end4", "end5", "end6"];

export const HomeModuleProvider = ({ children }) => {
  const subE1 = ["sub1", "sub2"];
  const subE2 = ["sub3", "sub4"];
  // const [SubEvent1, setSubEvent1] = useState([]);
  // const [SubEvent2, setSubEvent2] = useState([]);
  const [epilList, settingEpilList] = useState([]);
  const [endingCollection, settingEndingCollection] = useState([]);
  //const [subE3, setSubE3] = useState(["sub5"]);
  const [randomPick, setRandomPick] = useState(0);
  //const SubE2 = [Sub4, Sub5, Sub6];

  const [firstEvent, setFirstEvent] = useState([]);

  const setEpilList = (prop) => {
    settingEpilList(prop);
  };
  const setEndingCollection = (prop) => {
    settingEndingCollection(prop);
  };
  const addSubEvent = () => {
    for (var i = 1; i < 3; i++) {
      do {
        const e = eval(`subE${i}`)[
          Math.floor(Math.random() * eval(`subE${i}`).length)
        ];
        if (!eval(`SubEvent${i}`).includes(e)) {
          console.log(e);

          eval(`SubEvent${i}`).push(e);
        }
      } while (eval(`SubEvent${i}`).length < 2);
    }
    // setSubEvent1(subEvent1);
    // setSubEvent2(subEvent2);
  };

  const [eventCounter, settingEventCounter] = useState(0);

  const [scripts, settingScripts] = useState([...main1]);
  const [scriptCode, settingScriptCode] = useState("A0");
  const [eventScript, settingEventScript] = useState([
    ...scripts[0][scriptCode],
  ]);
  const [nextScript, settingNextScript] = useState(1);
  const [pressable, settingPressable] = useState(false);
  const [choices, settingChoices] = useState([]);
  const [showingScript, settingShowingScript] = useState({
    [0]: { ...eventScript[0] },
  });
  const [typing, settingTyping] = useState(true);

  const setEventCounter = (prop) => {
    settingEventCounter(prop);
  };

  const setScripts = (prop) => {
    settingScripts(prop);
  };

  const [newEvent, setNewEvent] = useState(0);

  const checkEpil = async () => {
    const value = await useAsyncStorage("collectedEP").getItem();
    const collection = JSON.parse(value);

    epils.map((ep) => {
      console.log("ep:", ep);
      if (eval(ep).every((v) => choices.includes(v))) {
        if (value === null) {
          useAsyncStorage("collectedEP").setItem(JSON.stringify([ep]));
          setEpilList(ep);
        } else {
          if (epilList.includes(ep) !== true) {
            useAsyncStorage("collectedEP").setItem(
              JSON.stringify([...collection, ep])
            );
            const valuelist = [...collection, ep];
            setEpilList(valuelist);
            console.log(valuelist);
          }
        }

        console.log("catch:", ep);
      }
    });

    console.log(epilList);
  };

  // useEffect(async () => {
  //   const thelist = await useAsyncStorage("SubEvent1").getItem();
  //   if (thelist !== null) {
  //     if (thelist.length !== 0) {
  //       SubEvent1 = JSON.parse(thelist);
  //     } else {
  //       await useAsyncStorage("SubEvent1").setItem(JSON.stringify(SubEvent1));
  //     }
  //   }

  //   console.log("SubEvent1 changed", SubEvent1);
  // }, [SubEvent1.length]);

  // useEffect(async () => {
  //   const thelist = await useAsyncStorage("SubEvent2").getItem();
  //   if (thelist !== null) {
  //     if (thelist.length !== 0) {
  //       SubEvent2 = JSON.parse(thelist);
  //     } else {
  //       await useAsyncStorage("SubEvent2").setItem(JSON.stringify(SubEvent1));
  //     }
  //   }
  //   console.log("SubEvent2 changed", SubEvent2);
  // }, [SubEvent2.length]);

  // useEffect(() => {
  //   useAsyncStorage("eventCounter").setItem(JSON.stringify(eventCounter));
  //   console.log("encounter changed");
  // }, [eventCounter]);
  // useEffect(() => {
  //   console.log(newEvent);
  // }, [newEvent]);

  // const setFirstScreen = async (prop) => {
  //   console.log("screen loading...");

  //   console.log("죽여줘");
  //   console.log("firstscreen", prop);
  //   //setScriptCode(prop);
  // };

  useEffect(() => {
    if (choices.includes("main1")) {
      setChoices([]);
    }
  }, [choices]);

  const setScriptCode = async (prop) => {
    if (["subnav1", "subnav2", "subnav3"].includes(prop)) {
      console.log(newEvent);
      if (newEvent < 2) {
        setEventCounter((prev) => prev + 1);
        setNewEvent((prev) => prev + 1);
        switch (prop) {
          case "subnav1":
            settingScripts(eval(SubEvent1[eventCounter]));
            settingScriptCode(SubEvent1[eventCounter]);

            break;
          case "subnav2":
            settingScripts(eval(SubEvent2[eventCounter]));
            settingScriptCode(SubEvent2[eventCounter]);
            break;
          case "subnav3":
            if (choices.includes("E1")) {
              settingScriptCode("with2");
              settingScripts(with2);
            } else {
              settingScriptCode("out2");
              settingScripts(out2);
            }
            break;
        }
        console.log(newEvent);
      } else {
        if (choices.includes("E1")) {
          switch (prop) {
            case "subnav1":
              settingScriptCode("with1");
              settingScripts(with1);

              break;

            case "subnav2":
              settingScriptCode("K0");
              settingScripts(main3);

              break;
            /*case "subnav3":
              settingScriptCode("with2");
              settingScripts(with2);
              break;*/
          }
        } else {
          switch (prop) {
            case "subnav1":
              settingScriptCode("out1");
              settingScripts(out1);

              break;

            case "subnav2":
              settingScriptCode("K0");
              settingScripts(main3);

              break;
          }
        }
        setEventCounter(0);
        setNewEvent(0);
      }
    } else if (["main1", "main2", "main3", "main4"].includes(prop)) {
      switch (prop) {
        case "main1":
          console.log("c:", choices);

          console.log("checking...");
          checkEpil();

          console.log("reset");
          settingScripts([...main1]);
          settingScriptCode("A0");

          break;
        case "main2":
          settingScriptCode("H0");
          settingScripts(main2);
          break;
        case "main4":
          settingScriptCode("L0");
          settingScripts(main4);
          break;
      }
      setEventCounter(0);
      setNewEvent(0);
    } else if (mainEndingList.includes(prop)) {
      settingScriptCode(prop);
      settingScripts(mainEnding);

      const value = await useAsyncStorage("collectedME").getItem();
      const collection = JSON.parse(value);

      if (value === null) {
        useAsyncStorage("collectedME").setItem(JSON.stringify([prop]));
        const valuelist = [prop];
        setEndingCollection(valuelist);
        console.log("valuelist", valuelist);
      } else {
        if (endingCollection.includes(prop) !== true) {
          useAsyncStorage("collectedME").setItem(
            JSON.stringify([...collection, prop])
          );
          const valuelist = [...collection, prop];
          setEndingCollection(valuelist);
          console.log(valuelist);
        }
      }
      setEventCounter(0);
      setNewEvent(0);
    } else {
      settingScriptCode(prop);
    }
  };

  const setEventScript = (prop) => {
    settingEventScript(prop);
  };
  const setNextScript = (prop) => {
    settingNextScript(prop);
  };
  const setPressable = (prop) => {
    settingPressable(prop);
  };
  const setChoices = (prop) => {
    settingChoices(prop);
  };
  const setShowingScript = (prop) => {
    settingShowingScript(prop);
  };
  const setTyping = (prop) => {
    settingTyping(prop);
  };

  const getNextScript = () => {
    setNextScript((prev) => prev + 1);
    const newScript = {
      ...showingScript,
      [nextScript]: { ...eventScript[nextScript] },
    };
    setShowingScript(newScript);
  };

  const eraseScript = () => {
    setNextScript(1);
    setEventScript([...scripts[0][scriptCode]]);
  };

  useEffect(() => {
    console.log("erasingscript");
    eraseScript();
  }, [scriptCode]);

  useEffect(() => {
    const newScript = {
      [0]: { ...eventScript[0] },
    };
    setShowingScript(newScript);
    setTyping(true);
  }, [eventScript]);

  return (
    <HomeModuleContext.Provider
      value={{
        addSubEvent,
        main1,
        scripts,
        setScripts,
        scriptCode,
        setScriptCode,
        eventScript,
        setEventScript,
        nextScript,
        setNextScript,
        pressable,
        setPressable,
        choices,
        setChoices,
        getNextScript,
        eraseScript,
        showingScript,
        setShowingScript,
        typing,
        setTyping,
        SubEvent1,
        setEventCounter,
        randomPick,
        setEpilList,
        //setFirstScreen,
        setEndingCollection,
        endingCollection,
        epilList,
        eventCounter,
      }}
    >
      {children}
    </HomeModuleContext.Provider>
  );
};
