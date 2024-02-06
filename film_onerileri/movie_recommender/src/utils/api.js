// axios kütüphanesi 
import axios from "axios";

// The Movie Database (TMDB) API'nin temel URL'si
const BASE_URL = "https://api.themoviedb.org/3";

// TMDB API için kullanılacak olan token .env dosyasında
// TMDB API'sine erişim sağlamak için API anahtarı = token
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN; 
/*
.env dosyası api okuma erişim jetonunu saklar.
.meta yı .env dosyasının içindekilere erişebilmek için kullandım
*/

/*
Bu başlık TMDB API'ye gönderilecek olan her isteği yetkilendirmek için kullanılır.
API bu başlık aracılığıyla gelen anahtarı kontrol eder ve yetkilendirilmiş anahtarlarla yapılan
isteklere izin verir.
*/
const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};
/*
'Authorization' başlığı bir HTTP isteğinde bulunan tarayıcının veya uygulamanın kendisini yetkilendirdiğini belirtir.
"Bearer" tipi bir yetkilendirme kullanılmış ve bu tipin ardından TMDB API'ye erişim sağlamak için token eklenmiş.
*/

//API'den veri çekmek için kullanılacak fonksiyon
export const fetchDataFromApi = async (url, params) => {
  try {
    // axios kütüphanesiyle GET isteği atarak veriyi çekiyoruz
    const { data } = await axios.get(BASE_URL + url, {
      headers, //bu başlık, TMDB API'ye kimlik doğrulamasını sağlamak için kullanılır.
      params, /*params değişkeni, Axios'un get metoduna iletilen bir nesnedir ve bu nesne, isteğe bağlı olarak URL'ye eklenen parametreleri içerir. Örneğin, bir filmi arama sorgusu yapılıyorsa, bu parametreler arama kelimesi, tür, sıralama vb. olabilir. */
    });
    /*
    'await', 'axios.get' fonksiyonunun tamamlanmasını bekler. 'axios.get' bir HTTP GET isteği gönderir ve
    bu isteğin tamamlanması, uzaktan sunucudan verinin alınması gibi işlemleri içerir. 'await' kullanmak 
    bu işlemin tamamlanmasını bekleyerek kodunuzun bir sonraki satıra geçmesini engeller.
    'await' kullanıldığında 'async' işlev içinde olmalıdır.
    */

    //çekilen verinin döndürülmesi
    return data;
  } catch (err) {
    // hata durumunda hatayı konsola yazdırma
    console.log(err);
    return err;
  }
};

/* 
HTTP web tarayıcıları ve web sunucuları arasında bilgi iletimi için kullanılan bir protokoldür. 
HTTP istekleri bir tarayıcının bir sunucudan belli bir kaynağı (örneğin bir web sayfası) almak ve belirli
bir eylemi (form gönderme) gerçekleştirmek amacıyla sunucuya gönderdiği mesajlardır.
HTTP istekleri iki temel türe ayrılır: GET ve POST
*/


/*
params değişkeni, Axios kütüphanesindeki HTTP GET isteğinin bir parçası olan ve isteğe bağlı olarak URL'ye eklenen sorgu parametrelerini temsil eder. Sorgu parametreleri, bir HTTP GET isteği sırasında URL'nin sonuna eklenen ve sunucuya iletilen bilgilerdir. Bu parametreler, genellikle bir kaynağı filtrelemek, sıralamak veya sınırlamak için kullanılır.

İşte params değişkeninin kullanımına dair örnek bir açıklama:

const { data } = await axios.get(BASE_URL + url, {
  headers,
  params: {
    language: 'en-US',
    page: 1,
    query: 'action',
  },
});
Bu örnekte, params değişkeni bir nesnedir ve içinde üç sorgu parametresi bulunmaktadır:

language: İstediğimiz dil bilgisini belirtir (örneğin, 'en-US' İngilizce için).
page: Hangi sayfa numarasındaki verileri çekmek istediğimizi belirtir (örneğin, 1. sayfa).
query: Arama sorgusunu belirtir (örneğin, 'action' kelimesi ile arama yapmak).
Bu sorgu parametreleri, URL'ye şu şekilde eklenir:


https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=action
Bu URL, TMDB API'ye gönderilecek olan bir GET isteğini temsil eder. params değişkeni, isteğin içindeki sorgu parametrelerini belirtmek için kullanılır ve bu şekilde sunucuya hangi verileri almak istediğimizi veya hangi kriterlere göre veri almak istediğimizi iletebiliriz.
*/