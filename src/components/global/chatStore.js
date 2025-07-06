import { create } from "zustand";
//                           ||
//                           \/ name of the function to upadate the db
const useChatStore = create((set) => ({//need paranthesis to return object, not running code ()=>{key:"value"}<-this is code block, not object. ()=>({key:"value"}) <-correct
  //making a function like useState that will be used to store the chat data
  rtdb: {}, //initial version of the db
  setStore: (containerId, data) =>
    set((oldDbVersion) => ({
      //the funciton that is used to set new db version the of the chat
      rtdb: {
        ...oldDbVersion.rtdb, //saving the old db version with the chatIds
        [containerId]: {
          //it adds new chatId if unprecent or This level is the chatId level.
          ...oldDbVersion.rtdb[containerId], //keeping the old data. This level is the values like participants. also create new chat data in it
          ...data, //
        },
      },
    })),
}));

export default useChatStore;