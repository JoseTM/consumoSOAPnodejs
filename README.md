## Ejemplo de cliente SOAP con NodeJS y la librería soap

### Configuración del cliente

Copiar config.env_example a config.env y rellenar las variables de entorno:

```bash
export SOAP_USER=
export SOAP_PASSWORD=
export SOAP_WSDL=

export NODE_EXTRA_CA_CERTS=[ruta]/certificadoCA.crt
```

Si disponemos un certificado en formato .p12 ejecutar el script para generar los pem, suponiendo que el certificado sea INTEGRADOR.p12:

```bash
$> sh script_p12_to_pem.sh INTEGRADOR
```

Ejecución:
```bash
npm run connect
```

