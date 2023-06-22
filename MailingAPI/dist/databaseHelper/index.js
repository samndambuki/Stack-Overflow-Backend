"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHelper = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../config");
class DatabaseHelper {
    ///whenever an instance s created we can create a connection pool
    static addInputsToRequest(request, data = {}) {
        const keys = Object.keys(data);
        keys.map(keyName => {
            return request.input(keyName, data[keyName]);
        });
        return request;
    }
    //receive
    static exec(storedProcedure, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            //create a request
            let request = yield (yield DatabaseHelper.pool).request(); //empty - no inputs
            request = DatabaseHelper.addInputsToRequest(request, data);
            return request.execute(storedProcedure);
        });
    }
    static query(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield DatabaseHelper.pool).request().query(queryString);
        });
    }
}
//private - dont need it outside the class
//the type is a promise
DatabaseHelper.pool = mssql_1.default.connect(config_1.sqlConfig);
exports.DatabaseHelper = DatabaseHelper;
