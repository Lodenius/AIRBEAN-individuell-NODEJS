# Airbean 

## Instruktioner

I den individuella delen av Airbean så ska du skapa ett admin-gränssnitt för att hantera menyn. Det ska gå och lägga till och ta bort
produkter.

### Krav på funktionalitet
* Kunna lägga till en ny produkt i menyn. Man ska enbart kunna skicka med de egenskaper som finns på en produkt (`id`, `title`, `desc`, `price`) i bodyn. Alla egenskaper ska också finnas med. Det ska även läggas på en `createdAt` med datum och tid när den skapades.
* Kunna modifiera en produkt, om en produkt modifieras så ska en egenskap (`modifiedAt`) läggas till med datum och tid.
* Kunna ta bort en produkt. Det ska enbart gå att ta bort en produkt som finns.
* Uppnås inte kraven ovan ska ett passande felmeddelande skickas tillbaka.
* Alla tre endpoints:en ska vara skyddade med att användaren som loggar in ska ha en roll som heter `admin` (som finns sparad i databasen) som kontrolleras via en middleware. Användaren kan ni manuellt lägga till i databasen men det ska gå och kunna logga in d.v.s. ni behöver en endpoint för att logga in men det är inget krav för skapa konto.
* Menyn är sparad i en NeDB-databas.
* Det ska finnas en endpoint för att kunna lägga till kampanjerbjudanden som ska sparas i databasen enligt följande modell:
  - Vilka produkter som ingår (ex. bryggkaffe och Gustav Adolfsbakelse, ska valideras att dessa produkter finns)
  - Kampanjpris för denna kombination (ex. 40 kr totalt)
 
**För Godkänt:**
* Uppnår alla krav på funktionalitet.

**För Väl Godkänt:**
* Använder sig av JSON web token för att returnera en token som innehåller användarens roll och som används för att sedan kontrollera access till routes enligt ovan.
* Använder sig av Bcrypt.js för att kryptera lösenord vid skapandet av konto. Här är det fördelaktigt att lägga till funktionalitet för att skapa konto.

## Methods

### Hämta menyn
` GET /api/beans `

### Skapa konto
` POST /api/user/signup `

Exempel på request body:
`{
	"username": "username",
	"password": "password1234"
}`
Exempel på request body för att lägga till admin:
`{
	"username": "username",
	"password": "password1234",
	"role": "admin"
}`

### Logga in
` GET /api/user/login `

Exempel på request body:
`{
	"username": "username",
	"password": "password1234"
}`

## För admins

### Lägg till produkt 

` POST /api/admin/add `

Exempel på request body:
`{
	"userID": "34T10vzNa9SYOFW9",
	"product": [
	         {
		    "id": "test-vkzh17ct2r",
		    "title": "Test",
		    "desc": "En fastlagsbulle i sin rätta form.",
		    "price": 50
	          }
	  ]
}`

### Ändra produkt 

` POST /api/admin/modify `

Exempel på request body:
`{
	"userID": "34T10vzNa9SYOFW9",
	"product": [
	         {
		    "id": "cookie-vkzh17ct2r",
		    "whatToModify": "title",
		    "changeTo": "New description",
	          }
	  ]
}`

### Ta bort produkt 

` DELETE /api/admin/remove `

Exempel på request body:
`{
	"userID": "34T10vzNa9SYOFW9",
	"product": [
            { "id": "coffee-220dodpzmg" } 
	  ]
}`


### Lägg till kampanj

` POST /api/admin/newcampaign `

Exempel på request body:
`{
        "userID": "123456789abcd"
	"products": [
	    { "id": "coffee-m2h37k2mnh" }, 
            { "id": "coffee-220dodpzmg" } 
	 ],
	"price": 48
}`

### Se pågående kampanj/-er

` GET /api/admin/campaigns `

Exempel på request body:
`{
        "userID": "123456789abcd"
	"products": [
	    { "id": "coffee-m2h37k2mnh" }, 
            { "id": "coffee-220dodpzmg" } 
	 ],
	"price": 48
}`


## För kunder

### Lägg order
` POST /api/beans/order `

Exempel på request body:
`{
	"userID": "34T10vzNa9SYOFW9",
	"order": [
		{
			"id": "coffee-m2h37k2mnh"
		},
		{
			"id": "coffee-220dodpzmg"
		}
	]
}`

### Hämta orderhistorik
` GET /api/user/history `

Exempel på request body:
`{
	"userID": "11223344"
}`

### Hämta orderstatus
` GET /api/beans/order/status `

Exempel på request body:
`{
	"userID": "11223344",
	"orderNumber": "55667788"
}`
