
import { Client } from "soap";
import soap from 'soap'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config();

const {
   SOAP_USER: username,
   SOAP_PASSWORD: password,
   SOAP_WSDL: wsdlURL,
} = process.env;

console.log("> Cargandome al hombro " + wsdlURL + "\n");


const callback = (error, client) => {
   if (error) {
      console.log("\nHemos sido engañaos\n" + error + "\n")
   }

   const wsSecurity = new soap.WSSecurity(username, password, {
      hasNonce: true,
      hasTokenCreated: true,
      passwordType: "PasswordText",
      hasTimeStamp: false,
      mustUnderstand: true,
      actor: 'http://www.gobiernodecanarias.org/Platino/Authentication/1.0'
   });

   var privateKey = fs.readFileSync("INTEGRADOR_private.pem")
   var publicKey = fs.readFileSync("INTEGRADOR_public.pem")

   const wsSecurityCert = new soap.WSSecurityCert(
      privateKey,
      publicKey,
      password, {
      signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1'
   });

   const wsSecurityPlusCert = new soap.WSSecurityPlusCert(wsSecurity, wsSecurityCert);

   client.setSecurity(wsSecurityPlusCert)

   const callbackResponse = (error, result) => {
      if (error) {
         console.log("\n" + ">> La subida fué trambolica " + result.status + "->" + result.statusText);
         console.log(">> Ups el request boló por la arboleda: " + error.name + "->" + error.message + "\n");
         return;
      }
      console.log("\n" + ">> Si saben como me pongo, porque me dan la version: " + result.return.toString() + "\n");
   };



   client.getVersion({}, callbackResponse)


   client.generarParametrosPeticionClave({}, callbackResponse)


};

soap.createClient(wsdlURL, callback);