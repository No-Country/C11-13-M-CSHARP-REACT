import axios from "axios";
import { setId } from "../../reducers/payment";

const uri = "https://sdlt2.azurewebsites.net";

export function payment(data) {
  console.log(data);
  return async function (dispatch) {
    try {
      var json = await axios.post(`${uri}/api/Orden/CrearPrefMP`, data);
      console.log(json)
      dispatch(setId(json.data.Id)); // Llamamos a la acción setId en lugar de Id
    } catch (error) {
      console.log(error);
    }
  };
}
