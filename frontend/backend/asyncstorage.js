import * as SecureStore from 'expo-secure-store';

export const setItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}
  
export const getItem = async (key) => {
    let response = new Promise(function(resolve, reject){
        let result = SecureStore.getItemAsync(key);
        if (result) {
            resolve(result)
        } else {
            resolve(false)
        }
    })
    return response
}

export const deleteItem = async (key) => {
    await SecureStore.deleteItemAsync(key);
}