# Alternativas discutidas

1. Un token por app -> Se reconozca el login y se genere un nuevo token (si se googlea, buscar silence login)
2. Portal con todas las app -> login implicito
3. Token exchange -> API para cambiar de el token (esto se suele hacer con el refresh_token, pero la arquitectura de KC no lo permite, por eso hay que hacerlo con el feature token_exchange)
4. Conector WSGUP como proveedor a KC.
