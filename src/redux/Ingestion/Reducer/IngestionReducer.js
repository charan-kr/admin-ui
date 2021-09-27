import { FEATCH_INGESTION_DATA } from "../Constants/IngestionConstants";
const initial = {
  dskuid: "",
  DVN: "",
  sellerId: "",
  sellerSKUId: "",
  listingStatus: "",
  condition: "",
  commonName: "",
  restock: "",
  restockdate: "date",
  price: {
    mrp: "",
    currency_code: "",
    sellingPrice: "",
    discountPrice: "",
  },
  tax: {
    hsn: "",
    taxCode: "",
  },
  stock: "",
  maxQuantityOrder: "",
  minQuantityOrder: "",
  packageDetails: {
    weight: "",
    height: "",
    length: "",
    width: "",
    giftWrapAvailable: "",
    sellerMessage: "",
    isFragile: "",
  },
  dispatchSLA: "int",
  shippingDetails: {
    type: "",
    selfShip: {
      local_Shipping_Price_Per_Unit: "",
      zonal_Shipping_Price_Per_Unit: "",
      national_Shipping_Price_Per_Unit: "",
    },
  },
  wareHouselocations: [
    {
      sellerStoreId: "<location-id>",
      isActive: "y/n",
      inventory: 0,
    },
  ],
  labelInfo: {
    dataofManufacture: "Date",
    dateofExpiry: "date",
    language: "hindi/english",
    manufacturerInfo: {
      name: "",
      address: "",
      description: "",
    },
    importerInfo: {
      name: "",
      address: "",
      description: "",
    },
    packerInfo: {
      name: "",
      address: "",
      description: "",
    },
    countriesOfOrigin: "iso_alpha2_code_of_country_of_origin",
  },
};
const IngestionReducer = (state = initial, action) => {
  switch (action.type) {
    case FEATCH_INGESTION_DATA:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};
export default IngestionReducer;
