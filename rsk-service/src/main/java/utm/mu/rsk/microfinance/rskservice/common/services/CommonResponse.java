package utm.mu.rsk.microfinance.rskservice.common.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.common.entity.ResponseModel;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommonResponse {

    public ResponseEntity<ResponseModel> preparedSuccessResponseWMessage(Object data, String message) {
        ResponseModel responseModel = new ResponseModel();
        List result = new ArrayList();
        if(data instanceof JSONObject) {
            result.add(data);
        } else if (data instanceof JSONArray) {
            result = (List) data;
        } else if (data instanceof List) {
            result = (List) data;
        } else {
            result.add(data);
        }

        responseModel.setResult(result);
        responseModel.setStatusCode("200");
        responseModel.setStatus(message);

        return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.OK);
    }

    public ResponseEntity<ResponseModel> prepareFailedResponse(String errorMessage) {
        ResponseModel responseObject = new ResponseModel();
        responseObject.setError(errorMessage);
        responseObject.setResult(new ArrayList<>());
        responseObject.setStatusCode("400");
        responseObject.setStatus("FAILED");
        return new ResponseEntity<ResponseModel>(responseObject, HttpStatus.OK);
    }
}
