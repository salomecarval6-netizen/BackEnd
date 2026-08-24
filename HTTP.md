HYPER TEXT TRANSFER PROTOCOL





HTTP: normal data

HTTPS: Just extra encrypted layer + http





&#x09;----->

client		server

&#x09;<-----



addres where should I talk to?

URL: UNIFORM RESOURCE LOCATOR

URI: UNIFORM 

URN: 



HTTP Headers: used for caching, authentication, manage state

metadata: key-value sent along with request \& response.

X-Prefix-> 2012 (deprecated)



* Request Headers: from Client
* Response Headers: from Server
* Representation Headers: encoding/compression
* Payload Headers: Data





Most Common Headers:


* Accept: application/json
* User-Agent: application through which req is recived
* Authorization: Bearer JWT TOKEN
* Content-Type: imgaes/pdf
* Cookie: key-value pairs
* Cache-Control: 







CORS:


Access-Control-Allow-Origin

Access-Control-Allow-Credentials

Access-Control-Allow-Method





Security:
Cross-Origin-Embedder-Policy

Cross-Origin-Opener-Policy

Content-Security-Policy

X-XSS-Protection







HTTP Methods:

Basic set of operations that can be used to interact with server:



//THUNDER CLIENT / POSTMAN 	website to read more



GET: retrieve a resource \*\*
HEAD: No message body (response headers body)

OPTIONS: what operations are avaible

TRACE: loopback test(get same data)
DELETE: remove a resource

PUT: replace a resource

POST: interact with resource(mostly add) \*\*
PATCH: change part of sequnce





HTTP STATUS CODE:


1xx INFORMATIONAL

2xx SUCCESS

3xx REDIRECTION

4xx CLIENT ERROR

5xx SERVER ERROR



100	continue

102	processing

200	ok

201	created

202 	accepted

307	temporary redirect

308	permanent redirect

400	Bad request 

401	Unauthorized

402	Payment required

404	Not found

500	Internal Server Error

504	Gateway time out

