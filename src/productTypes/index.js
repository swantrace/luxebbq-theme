import Barbeques from './Barbeques';
import DrinkwareAndCoolers from './DrinkwareAndCoolers';
import Fuel from './Fuel';
import Furniture from './Furniture';
import GrillingAccessories from './GrillingAccessories';
import LifestyleAccessories from './LifestyleAccessories';
import Parts from './Parts';
import RubsAndSauces from './RubsAndSauces';

const useProductType = (type) => {
  switch (type) {
    case 'barbeques':
      return Barbeques;
    case 'grilling-accessories':
      return GrillingAccessories;
    case 'lifestyle-accessories':
      return LifestyleAccessories;
    case 'drinkware-and-coolers':
      return DrinkwareAndCoolers;
    case 'fuel':
      return Fuel;
    case 'parts':
      return Parts;
    case 'rubs-and-sauces':
      return RubsAndSauces;
    case 'furniture':
      return Furniture;
    default:
      throw new Error(
        `${type} is not valid parameter, you can choose one among barbeques, grilling-accessories, lifestyle-accessories, drinkware-and-coolers, fuel, parts, rubs-and-sauces, furniture`
      );
  }
};

export default useProductType;
