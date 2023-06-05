# Airbean 

## Instruktioner

I den individuella delen av Airbean så ska du skapa ett admin-gränssnitt för att hantera menyn. Det ska gå och lägga till och ta bort
produkter. Båda API-endpoints:en ska vara skyddad med en API-nyckel.

### Krav på funktionalitet
* Kunna lägga till en ny produkt i menyn. Man ska enbart kunna skicka med de egenskaper som finns på en produkt (`id`, `title`, `desc`, `price`) i bodyn. Alla egenskaper ska också finnas med.
* Kunna ta bort en produkt. Det ska enbart gå att ta bort en produkt som finns.
* Uppnås inte kraven ovan ska ett passande felmeddelande skickas tillbaka.
* Båda endpoints:en ska vara skyddade med en API-nyckel som kontrolleras via en middleware.
* Det ska finnas ett antal fördefinerade API-nyckel att hämta från.
* Menyn är sparad i en NeDB-databas.

**För Godkänt:**
* Uppnår alla krav på funktionalitet.
* Använder sig av en middleware för att kontollera API-nyckel

**För Väl Godkänt:**
* Ska endpoints och middleware vara i två olika JS-filer som importeras in i din app.js
