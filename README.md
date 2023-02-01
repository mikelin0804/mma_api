# MMA API

Get a list of upcoming MMA event from different mixed martial arts organizationm and info of fighters. 
Information for each upcoming events include main fight of each event, link to event page, location and poster. 
Information for fighter include name, nicknames and different fight stats.

Data is available exclusively in JSON.

# List of endpoints with parameters

## Endpoints
`/ufc`
* Returns of upcoming UFC events (see below).

`/bellator`
* Returns of upcoming Bellator events (see below).

`/ufcfighter`
* Returns of upcoming UFC events (see below).

## Parameters
| Name        | Type        | Description   |
| :---        |    :----:   |          :--- |
| fighterName         | string       | Required. UFC fighter searching for. |         


# Description of resources - formatted as JSON

Gets information about upcoming UFC events: 

Response for `/ufc`
```json  
{ 
    "match": "A string containing the name of the event."
    "link": "A string containing the link to the homepage of the event."
    "image": "A string containing the poster of fighter 1."
    "image2": "A string containing the poster of fighter 2."
    "city": "A string containing the city of the location."
    "location": "A string containing the country of location."
}   
```

Gets information about upcoming Bellator events: 

Response for `/bellator`
```json  
{ 
    "match": "A string containing the name of the event."
    "link": "A string containing the link to the homepage of the event."
    "location": "A string containing the country of location."
    "image": "A string containing the poster of event."
}   
```

Gets information about the UFC fighter: 

Response for `/ufcfighter`
```json  
{ 
    "division": "A string containing the division of fighter at."
    "pfp": "A string containing the p4p ranking of the fighter."
    "nickname": "A string containing the nickname of the fighter."
    "fighterName": "A string containing the name of the fighter."
    "record": "A string containing the record of the fighter."
    "winStreak": "A string containing the win streak."
    "winKnock": "A string containing the times of winning by knock out."
    "titleDefense": "A string containing the time of title defending."
    "strikeLand": "A string containing the strike landed in career."
    "strikeAttempt": "A string containing the strike attempt in career."
    "takedownLand": "A string containing the takedown land in career."
    "takedownAttempt": "A string containing the takedown attempt in career."`
}   
```

# Sample request with sample response

## Example

**Request**

    Get:  https://mmaapi-production.up.railway.app/ufcfighter/jon-jones

**Response:**
```json
[
   {
      "division":"Light Heavyweight Division",
      "pfp":"#11 PFP",
      "nickname":"\"Bones\"",
      "fighterName":"Jon Jones",
      "record":"26-1-0 (W-L-D)",
      "winStreak":"4",
      "winKnock":"10",
      "titleDefense":"10",
      "srikeLand":"1463",
      "strikeAttempt":"2526",
      "takedownLand":"36",
      "takedownAttempt":"95"
   }
]
```
