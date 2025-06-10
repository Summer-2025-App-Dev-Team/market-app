import { doc, getDoc } from 'firebase/firestore';
import {create} from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if(!uid) return set({currentUser: null, isLoading:false});
        console.log("running fetch user info");
        try{
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                console.log("docsnap exists");
                set({currentUser: docSnap.data(), isLoading: false});
            }else{
                set({currentUser: null, isLoading:false});
                console.log("docsnap doesnt exist");
            }
        }catch(err){
            console.log("error at fetch user info ");
            console.log(err)
            return set({currentUser: null, isLoading:false});
        }
    }

}))