import { configureStore } from '@reduxjs/toolkit' // Redux Toolkit'ten configureStore fonksiyonu alınır

import homeSlice from './homeSlice'; 

export const store = configureStore({ //Redux mağazasını yapılandırmak için configureStore kullanılır
  reducer: {
    home: homeSlice,
  },
})