import { FEATCH_INGESTION_DATA } from "../Constants/IngestionConstants";
import axios from "axios";

import IngestionService from "../../../Components/Service/IngestionService";
export const IngestionActions = (id) => async (dispatch, getState) => {
  const service = new IngestionService();

  const response = await service.getSKUDetailsById(id);
  if (response.status === 200) {
    dispatch({
      type: FEATCH_INGESTION_DATA,
      payload: response.data,
    });
  }
};
