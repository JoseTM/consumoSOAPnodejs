openssl pkcs12 -legacy -in $1.p12 -out $1_public.pem -clcerts -nokeys
openssl pkcs12 -legacy -in $1.p12 -out $1_private.pem -clcerts -nodes

