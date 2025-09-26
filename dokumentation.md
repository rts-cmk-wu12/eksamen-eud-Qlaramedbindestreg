# Dokumentation for SwapHub
Clara Qvist-Richards WU12

Jeg har lavet valgfri opgave C

## Tech-stack 
* Next.js
Jeg har brugt Next.js som mit primære Framework. Det arbejder godt sammen med React, men Next er et full-stack framework, så de er bedre til at løse opgaven end kun React alene, da der er mange serverside funktioner der skal bruges til at lave CRUD handlinger.
* React
React er et Javascript bibliotek hvor man kan lave komponenter til at bygge bruger interfaces, UI.
* Git
Git er et open source system der bruges til at styre projekter og bruges til at sørge for ændringer der bliver lavet i kode, både så det ikke kun bliver stored lokalt, men også for at gøre det nemmere at samarbejde. Jeg har specifikt brugt GitHub til at hoste mit repository.
* React-icons
Et ikon-bibliotek hvor man kan importere ikoner direkte i sit react project uden at man behøver at downloade dem enkeltvist. Det samler mange forskellige ikon-biblioteker som man nemt kan refere til i sine imports.
* SASS
En CSS extension der gør styling nemmere ved at man blandt andet kan neste værdier og laver genanvendelige variabler. Det er mere struktureret og overskueligt end almidelig CSS.
* SwapHub API
Rest API modtaget af skolen til at fetche og manipulere data. Understøtter CRUD handlinger (Create, read, update, delete ) via http anmodninger som POST, GET, PUT, DELETE. Håndterer også authenticate tokens. Giver blandt andet adgang til users, listings og newsletter.
* Zod
Et validerings bibliotek hvor man definerer scemaer til at validere data.
* Toastify
Bruges til at vise pop-up notifikationer i React. Bruges til success fejl og advarselsbeskeder. Jeg bruger den for eksempel til login. 

Kilder:
https://nextjs.org/docs
https://react.dev/learn/describing-the-ui
https://git-scm.com/
https://react-icons.github.io/react-icons/
https://sass-lang.com/guide/
https://zod.dev/
https://fkhadra.github.io/react-toastify/introduction


### Kom igang
* For at starte projekt
cd projekt
npm install
npm i --save-dev sass
npm i react-icons 
npm i react-paginate --save 
npm i --save react-toastify
npm i zod
npm run dev

* For at starte api
cd api
npm install
npm start


#### Kode-eksempel
Fil:
/Users/qlara/Desktop/coding/next/eksamen-eud-Qlaramedbindestreg/projekt/src/app/page.jsx
``` jsx


 useEffect(() => { 
  async function fetchListings() {
    try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`);
  if (!response.ok) throw new Error("fetch fejl");
  const data = await response.json();
  setListings(data);
 } catch (error) {
  console.error("fetch fejl", error);
 }
}
 fetchListings();
 }, []);


function SearchSection({ listings, currentPage, setCurrentPage, listingsPerPage }) {
  const { results } = useContext(searchContext);

const displayedList = results && results.length ? results : listings;

const pageCount = Math.ceil(displayedList.length / listingsPerPage);
const start = currentPage * listingsPerPage;
const currentListings = displayedList.slice(start, start + listingsPerPage);

  const handlePageClick = (pageIndex) => setCurrentPage(pageIndex);
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, pageCount - 1));

```
Jeg starter med at kalde useEffect som er en react hook. Den håndterer mit fetch (datahentning fra API'er), som er asynkron. useEffect kører efter komponentet er blev rendered og har derfor som sådan egentlig ikke har noget med vores hovedfunktion at gøre. usEffect returnerer derfor ikke noget, men kan bruges som en indre asynkron funktion (altså useEffect i sig selv må ikke være asynkron, men den lader den indre funktion være det). 
Det er den jeg har kaldt fetchListings. Den kører en gang når komponentet mountes, fordi mit dependency array er tomt. Hvis jeg havde props eller state deri, ville useEffect køre igen hver gang den ændrede sig (ved brugerinteraktion).

I fetchListings henter jeg data fra API'et. Jeg kører mit fetch med et promise (await) om at koden kører når requested er færdigt. Jeg checker manualt res.ok om der er en error. Så await venter på fetch og res.ok checker status.
const data = await.res.json() refererer til det data som mit api har returneret som json data. Fejl håndteres i try/catch.
Hvis mit state returnerer dataen som forventet, renderer react resultaterne i setListings(data);

Min SearchSection bruger de hentede listings fra mit API. Hvis brugeren søger noget, viser results søgeresultaterne. Math.ceil beregner hvor mange sider der skal vises og er en del af min pagination. handlePageClick, handlePrev og handleNext styrer pagination mellem siderne som math.ceil har opdelt.

Jeg har gjort projektet klar til at blive skaleret ved at bruge BEM navngivningskonventioner, lavet selvdokumenterende kode ved at give komponenter letoverskuelige navne og komme dem i mapper der giver et nemmere overblik og ved at lave SCSS variabler der nemt kan genbruges.

Kilder:
https://react.dev/reference/react/useEffect
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises
https://getbem.com/introduction/
https://react.dev/reference/react/useContext
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
https://react.dev/learn/rendering-lists


