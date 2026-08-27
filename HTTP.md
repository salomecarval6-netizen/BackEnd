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



POST {Createcreate(), save()}
[interact with resource(mostly add)]: Used to create a brand-new resource (e.g., registering a new user, creating a new post).

PUT {Update (Full)replaceOne()}
[ replace a resource ]: Used to replace an existing resource entirely. You must send the complete updated object. If you leave fields out, they might be deleted or set to null.

PATCH : {Update (Partial)updateOne(), $set}
[change part of sequnce] : Used to modify or update only specific pieces of an existing resource (e.g., updating just the password, or just an email address), leaving the rest of the user data completely untouched.

GET : {Readfind(), findById()}

(Read): Used exclusively to retrieve data from the server. It should never change or modify any data on the database.
How data is passed: Through the URL path (e.g., /users/123) or query parameters (e.g., /search?name=john).
It cannot have a request body.

DELETE (Delete): {DeletefindByIdAndDelete()}:
: Used to remove a specific resource from the server completely.
How data is passed: Usually via URL parameters pointing to the specific ID of the item to be deleted.

OPTIONS (Pre-flight):
This is an automatic background method used primarily by web browsers for CORS (Cross-Origin Resource Sharing) security.
How it works: Before a frontend website makes a sensitive request (like a POST, PUT, or PATCH) to a different backend server domain, the browser automatically sends an OPTIONS request first. 
It asks the server: "Are you allowed to receive data from my domain, and what methods do you accept?"
Example: You rarely have to write routes for this manually; middleware like the Express cors() package handles it 
for you.

HEAD:
Identical to a GET request, but the server responds without the body—it only sends back the HTTP headers.
Use Case: Used to check if a large file exists or to see its file size (Content-Length) before wasting internet bandwidth downloading the actual file.

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

