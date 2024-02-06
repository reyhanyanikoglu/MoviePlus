import { createSlice } from '@reduxjs/toolkit' // Redux Toolkit'ten createSlice fonksiyonu alınır


export const homeSlice = createSlice({ // homeSlice adlı bir Redux slice oluşturulur

  name: 'home', //dilimin adı
  initialState: { // slice'ın başlangıç durumu
    url: {},
    genres: {},
  },
  reducers: { //getApiConfiguration adında bir işlem tanımlar
    getApiConfiguration: (state, action) => {
        state.url = action.payload; //bu işlem state'in "url" özelliğini action.payload ile günceller
        //API'dan alınan konfigürasyon bilgilerini saklamak için kullanılır.
    },
    getGenres: (state, action) => {
        state.genres = action.payload; //bu işlem state'in genres özelliğini action.payload ile günceller
        //API'dan alınan tür bilgilerini saklamak için kullanılır
    }
  },
})


export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer;

/*
createSlice fonksiyonu Redux Toolkit kütüphanesinin bir parçasıdıe ve REdux store yönetimi için 
kolay bir yol sağlar.Redux yazmayı daha basit hale getirir.
*/