import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { MainPanel } from "./components/MainPanel";
import { faker } from "@faker-js/faker";
import { InterfaceFake } from "./components/InterfaceFake";
import { useState } from "react";
class fakeEntry {
  constructor(id, fullName, city, address, phone) {
    this.id = id;
    this.fullName = fullName;
    this.city = city;
    this.address = address;
    this.phone = phone;
  }
}

function App() {
  const [errorCount, setErrorCount] = useState(0);
  const [region, setRegion] = useState("en");
  const [seed, setSeed] = useState(0);
  const [pages, setPages] = useState(1);

  const regions = ["English", "Россия", "Украина"];
  let allEntries = [];
  faker.seed(Number(seed));

  const generateNewFakeEntry = () => {
    const createEntry  = () => {
      return new fakeEntry(
          faker.datatype.uuid(),
          faker.name.fullName(),
          faker.address.cityName(),
          faker.address.streetAddress(),
          faker.phone.phoneNumberFormat()
      );
    };

    switch (region) {
      case 'English':
        faker.setLocale('en');
        break;
      case 'Россия':
        faker.setLocale('ru');
        break;
      case 'Украина':
        faker.setLocale('uk');
        break;
    default:
      break;
  }
return createEntry ();
}

  const createFakeEntries = (entriesCount = 20) => {
    return Array.from({ length: entriesCount }, generateNewFakeEntry);
  };

  const scrambleString = (str, type) => {
    const iterations = [str];

    const deleteCharacter = () => {
      const lastString = iterations[iterations.length - 1];
      const charToDelete = faker.datatype.number({ max: lastString.length });
    
      const updatedString = `${lastString.slice(0, charToDelete - 1)}${lastString.slice(charToDelete)}`;
      iterations.push(updatedString);
    };

    const addNewCharacter = () => {
      const lastIteration = iterations[iterations.length - 1];
      const whereToAdd = faker.datatype.number({ max: str.length });
    
      const randomFullName = faker.name.fullName();
      const randomStreetAddress = faker.address.streetAddress();
      const randomCityName = faker.address.cityName();
    
      const getRandomCharacterIndex = (s) => faker.datatype.number({ max: s.length - 3 });
      let charToAdd;
    
      switch (type) {
        case 'id':
          charToAdd = faker.random.alpha(1);
          break;
        case 'name':
          charToAdd = randomFullName[getRandomCharacterIndex(randomFullName)];
          break;
        case 'city':
          charToAdd = randomCityName[getRandomCharacterIndex(randomCityName)];
          break;
        case 'address':
          charToAdd = randomStreetAddress[getRandomCharacterIndex(randomStreetAddress)];
          break;
        case 'num':
          charToAdd = faker.datatype.number({ min: 0, max: 9 });
          break;
        default:
          break;
      }
    
      const updatedString = lastIteration.substring(0, whereToAdd) + charToAdd + lastIteration.substring(whereToAdd);
      iterations.push(updatedString);
    };

    const swapCharacters = () => {
  const lastIteration = iterations[iterations.length - 1];
  const charToSwap = faker.datatype.number({ max: str.length });
  const updatedString = `${lastIteration.substring(0, charToSwap - 1)}${lastIteration[charToSwap]}${lastIteration[charToSwap - 1]}${lastIteration.substring(charToSwap + 1)}`;
  iterations.push(updatedString);
};

    const operation = faker.datatype.number({ max: 2 });

    switch (operation) {
    case 0:
        deleteCharacter ();
        break;
    case 1:
      addNewCharacter ();
        break;
    case 2:
      swapCharacters ();
        break;
  default:
    break;
}
return iterations[iterations.length - 1];
}

const addErrors = (input) => {
  const postError = input.slice(1).map((item) => {
    const idList  = [item.id];
    const nameList  = [item.fullName];
    const cityList  = [item.city];
    const addressList  = [item.address];
    const phoneList  = [item.phone];

    let isFloat  = false;
    let errors;

    if (Number.isInteger(errorCount)) {
      isFloat  = false;
      errors = errorCount;
    }
    if (!Number.isInteger(errorCount)) {
      isFloat  = true;
      errors = errorCount + 0.5;
    }

      const inroduceErrors = (count) => {
        for (let i = 0; i < count; i++) {
          const lastId  = idList [idList .length - 1];
          const lastName  = nameList [nameList .length - 1];
          const lastCity  = cityList [cityList .length - 1];
          const lastAddress  = addressList [addressList .length - 1];
          const lastPhone  = phoneList [phoneList .length - 1];
          const fieldToChange  = faker.datatype.number({ max: 4 });

          if (fieldToChange  === 0) {
            idList.push(scrambleString(lastId , "id").substring(0, 40));
          }
          if (fieldToChange  === 1) {
            nameList .push(scrambleString(lastName , "name").substring(0, 40));
          }
          if (fieldToChange  === 2) {
            cityList .push(scrambleString(lastCity , "city").substring(0, 40));
          }
          if (fieldToChange  === 3) {
            addressList .push(scrambleString(lastAddress , "address").substring(0, 40));
          }
          if (fieldToChange  === 4) {
            phoneList .push(scrambleString(lastPhone , "num").substring(0, 40));
          }
        }
      };

    if (isFloat ) {
      const rndm = faker.datatype.boolean();
      rndm ? inroduceErrors(errors) : inroduceErrors(errors - 1);
    }
    if (!isFloat ) inroduceErrors(errors);

    item.id = idList [idList .length - 1];
    item.fullName = nameList [nameList .length - 1];
    item.city = cityList [cityList .length - 1];
    item.address = addressList [addressList.length - 1];
    item.phone = phoneList [phoneList .length - 1];

    return item;
  });

  return postError;
};

  const renderEntries = () => {
    for (let i = 0; i < pages; i++) {
      allEntries.push(...createFakeEntries());
    }

    return addErrors(allEntries);
  };

  const handleRegionSelection  = (e) => {
    setRegion(e.currentTarget.value);
  };

  const handleErrorCount  = (e) => {
    setErrorCount(Number(e.currentTarget.value));
  };

  const handleSliderChange  = (e) => {
    setErrorCount(Number(e.currentTarget.value));
  };

  const handleSeedSelection  = (e) => {
    if (e.currentTarget.id === "seed-number") setSeed(e.currentTarget.value);
    if (e.currentTarget.id === "seed-generate") setSeed(faker.datatype.number({ max: 30000 }));
    if (seed > 30000) setSeed(30000);
  };

  const scrollHandler = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight / 0.5) setPages(pages + 1);
  };

  return (
    <section className='app-parent'>
      <div className='app-body-cont'>
        <MainPanel
          uuidv4={uuidv4}
          errorCount={errorCount}
          regions={regions}
          region={region}
          handleRegionSelection ={handleRegionSelection }
          handleErrorCount ={handleErrorCount }
          handleSliderChange ={handleSliderChange }
          seed={seed}
          handleSeedSelection ={handleSeedSelection }
        />
        <InterfaceFake 
          uuidv4={uuidv4} 
          fakeEntries={renderEntries()} 
          region={region} 
          scrollHandler={scrollHandler} 
        />
      </div>
    </section>
  );
}

export default App;

